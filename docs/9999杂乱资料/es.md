## QueryBuilder

QueryBuilder  常用来配合 Search 查询来使用 
boolQuery() 布尔查询，可以用来组合多个查询条件 
fuzzyQuery() 相似度查询 
matchAllQuery() 查询所有数据 
regexpQuery() 正则表达式查询 
termQuery() 词条查询 
wildcardQuery() 模糊查询 
等等.....

### matchQuery 匹配查询: 

    matchQuery可以简单理解为mysql中的like，但是我不知道我这么理解对不对，因为在elasticsearch中使用matchQuery查询时，他会对查询的field进行分词，打个比方，我们搜索"联想笔记本电脑"，他可能会将他拆分为：“联想”，“电脑”，“联想电脑”，那么如果一个filed中包括 联想 两个字就可以被搜出来。当然我们进行查询的这个field的mapping必须是text类型。（如果是中文分词的话，还需要配置中文分词器），他的查询语句和上边基本相似

public void test() throws IOException {
        SearchRequest searchRequest = new SearchRequest();
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        # matchQuery 匹配查询
        searchSourceBuilder.query(QueryBuilders.matchQuery("text", "19"));

 




    # multiMatchQuery(Object text, String... fieldNames) 多个字段匹配某一个值
    # 搜索name中或interest中包含有music的文档 (必须与music一致)
    public void test() throws IOException {
        SearchRequest searchRequest = new SearchRequest();
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
     
        searchSourceBuilder.query(QueryBuilders.multiMatchQuery("music", "name", "interest"));
}

 

    # wildcardQuery()模糊查询，?匹配单个字符，*匹配多个字符
    # 搜索名字中含有jack文档 （name中只要包含jack即可）
    public void test() throws IOException {
        SearchRequest searchRequest = new SearchRequest();
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
     
        searchSourceBuilder.query(QueryBuilders.wildcardQuery("name","*jack?*"));
}

### matchAllQuery 查询所有

查询指定index和type中的所用记录，相当于sql：select * from sales 

    public void test() throws IOException {
        SearchRequest searchRequest = new SearchRequest();
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.matchAllQuery());
}

### termQuery等值搜索

我们在数据库中进行查询的时候，sql：select sales from tvs where brand = ‘小米’，那么在elasticsearch中的javaapi怎么写呢？这里我们用到一个termQuery，他相当于sql语句中的“=”，使用这个搜索一般是对索引中keyword的mapping进行等值搜索      term query 属于过滤器查询，可以处理数字（numbers）、布尔值（Booleans）、日期（dates）以及文本（text）。

    public void test() throws IOException {
        SearchRequest searchRequest = new SearchRequest();
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.termQuery("name", "张三"));
}


    # terms 是多值判断
     
    public void test() throws IOException {
        SearchRequest searchRequest = new SearchRequest();
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.termsQuery("name", "张三", "李四", "王五"));
}

### matchPhraseQuery短语搜索

理解:   你会发现，使用“小别克老”没有查询出任何结果，而使用“小别克听”则查询出了我们需要的结果，这便matchPhraseQuery和matchQuery等的区别，在使用matchQuery等时，即使你传入的是“小别克老”，在执行查询时，“小别克老”会被分词器分词，例如paoding解析成“小别/别克/老”，而使用matchPhraseQuery时，“小别克老”并不会被分词器分词，而是直接以一个短语的形式查询，而如果你在创建索引所使用的field的value中没有这么一个短语（顺序无差，且连接在一起），那么将查询不出任何结果。

    public void test() throws IOException {
        SearchRequest searchRequest = new SearchRequest();
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.matchPhraseQuery("name", "张三"));
}

### prefixQuery前缀搜索

如我我们需要查询的title中有“大话西游电影”，“大话西游小说”，使用prefixQuery查询“大话西游”，那么那两条数据就会出来

    public void test() throws IOException {
        SearchRequest searchRequest = new SearchRequest();
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.prefixQuery("title", "大话西游"));
}

### disMaxQuery

disMaxQuery适用于多个field的进行搜索，我们在多个field搜索时候，可能会遇到多个field匹配到了更多的词会在前面，而一个field匹配了更多的词就会排名靠后。disMax就是解决这个问题，dismax使搜索到的结果，应该是某一个field中匹配到了尽可能多的关键词，被排在前面；而不是尽可能多的field匹配到了少数的关键词，排在了前面

    public void test() throws IOException {
        SearchRequest searchRequest = new SearchRequest();
        SearchSourceBuilder searchSourceBuilder = newSearchSourceBuilder();  
searchSourceBuilder.query(QueryBuilders.disMaxQuery().add(QueryBuilders.matchQuery("name", "张三")));
}

### boolQuery 组合查询条件

boolQuery用来将搜索的条件进行组合，即将多个组合条件组合在一起，常用的几种组合方式有must、should、mustNot，我们拿下面对应的sql语句举例子

sql:select * from sales where brand = '小米' and color='红色'，通过bool将两个查询条件组合，

must相当于sql中的= 必须匹配的意思

BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
		boolQuery.must(QueryBuilders.termQuery("brand", "小米"))
				.must(QueryBuilders.termQuery("color", "红色"));

sql:select * from sales where brand = '小米' or color='红色'；使用should相当于sql语句中的or

BoolQueryBuilder boolQuery2 = QueryBuilders.boolQuery();
		boolQuery2.should(QueryBuilders.termQuery("brand", "小米"))
				.should(QueryBuilders.termQuery("color", "红色"));

sql:select * from sales where brand = '小米' and color != '红色' mustNot相当于!= 必须不匹配

BoolQueryBuilder boolQuery3 = QueryBuilders.boolQuery();
		boolQuery2.must(QueryBuilders.termQuery("brand", "小米"))
				.mustNot(QueryBuilders.termQuery("color", "红色"));

sql:select * from sales where (brand = '小米' or color = '红色') and brand != '长虹'

BoolQueryBuilder boolQuery4 = QueryBuilders.boolQuery();
		BoolQueryBuilder boolQuery5 = QueryBuilders.boolQuery();
		boolQuery5.should(QueryBuilders.termQuery("brand", "小米"))
				.should(QueryBuilders.termQuery("color", "红色"));
		boolQuery4.must(boolQuery5)
				.mustNot(QueryBuilders.termQuery("brand", "长虹"));

 


//设置查询条件
        
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
        if (StringUtils.isNotEmpty(text)) {
            //查询条件：字段名为text，内容含有text的数据
            boolQuery.must(QueryBuilders.matchQuery("text", text));
        }
        if (StringUtils.isNotEmpty(keywords)) {
            //查询条件：字段名为keywords，内容含有keywords的数据
            boolQuery.must(QueryBuilders.matchQuery("keywords", keywords));
        }
        if (StringUtils.isNotEmpty(topic)) {
            //查询条件：字段名为topic，内容含有topic的数据
            boolQuery.must(QueryBuilders.matchQuery("topic", topic));
        }
### rangeQuery属于过滤器查询

是范围查询，有时候，范围查询比精确值查询更有用，比如我想知道价格在20到40之间的商品；

range query可以处理数字（numbers）、日期（dates）以及字符串，不过字符串还是不要用范围查询的好，效率会很低；

对数字取范围没啥好说的， 就大于、大于等于、小于、小于等于四个符号加数字就可以；

### 闭区间查询
QueryBuilder qb1 = QueryBuilders.rangeQuery("${fieldName}").from(${fieldValue1}).to(${fieldValue2});

### 开区间查询
QueryBuilder qb1 = QueryBuilders.rangeQuery("${fieldName}").from(${fieldValue1}, false).to(${fieldValue2}, false);

### 大于
QueryBuilder qb1 = QueryBuilders.rangeQuery("${fieldName}").gt(${fieldValue});

### 大于等于

QueryBuilder qb1 = QueryBuilders.rangeQuery("${fieldName}").gte(${fieldValue});

### 小于
QueryBuilder qb1 = QueryBuilders.rangeQuery("${fieldName}").lt(${fieldValue});

### 小于等于
QueryBuilder qb1 = QueryBuilders.rangeQuery("${fieldName}").lte(${fieldValue});

### 多条件案例
QueryBuilder qb1 = QueryBuilders.moreLikeThisQuery(new String[]{"${fieldName1}"}, new String[]{"${fieldValue1}"}, null);
QueryBuilder qb2 = QueryBuilders.rangeQuery("${fieldName2}").gt("${fieldValue2}");
QueryBuilder qb3 = QueryBuilders.boolQuery().must(qb1).must(qb2);



## 8.0
api:https://www.elastic.co/guide/en/elasticsearch/client/java-api-client/8.2/indexing.html
restful:http://testingpai.com/article/1606900150040
https://blog.csdn.net/weixin_46501729/article/details/124997736 
https://www.codetd.com/article/13782230





#### 创建索引index

```
put /索引名称     #创建简单索引,默认情况下不规定索引中的项有哪些
```

#### 查询所有索引index

```
get /_cat/indices?v    #查询所有的索引情况：健康情况、名称、包含数据量、大小等
```

#### 查询单个索引index

```
get /索引名称     #获取单个索引详情
```

#### 删除单个索引index

```
delete /索引名称
```

#### 在已有索引中新增Document（一行数据）

```
post  /索引名称/_doc/标识列的值      #不指定标识列的值，依然会创建成功，但是值会自动生成（UUID）

数据(json数据格式)：
{
    "id":1,
    "name":"哈哈",
    "age":20,
    "gender":"男"
}
```

#### 查询单个索引中的所有数据

```
get /索引名称/_search
```

#### 查询单个数据

```
get /索引名称/_doc/标识列的值    
```

#### 修改单个数据

```
post /索引名称/_update/标识列的值

数据
{
    "doc":{
        "要改变的列名": "列值"
    }
}
```

#### 删除

```
delete /索引名称/_doc/标识列的值
```



#### Pom.xml

```
	<properties>
        <java.version>1.8</java.version>
        <elasticsearch.version>8.1.1</elasticsearch.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <spring-boot.version>2.3.7.RELEASE</spring-boot.version>
    </properties>
 
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
 
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>co.elastic.clients</groupId>
            <artifactId>elasticsearch-java</artifactId>
            <version>8.1.1</version>
        </dependency>
        <dependency>
            <groupId>jakarta.json</groupId>
            <artifactId>jakarta.json-api</artifactId>
            <version>2.0.1</version>
        </dependency>
    </dependencies>
```



#### esclient

```
@Bean
	public ElasticsearchClient elasticsearchClient() {
		RestClient restClient=RestClient.builder(new HttpHost("127.0.0.1", 9200)).build();
		ElasticsearchTransport transport=new RestClientTransport(restClient, new JacksonJsonpMapper());
		ElasticsearchClient elasticsearchClient=new ElasticsearchClient(transport);
		return elasticsearchClient;
	}
```

