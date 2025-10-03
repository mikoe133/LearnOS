## springboot整合JPA

1. pom.xml导入**spring-web、mysql-driver、JPA**构建项目

2. 配置application.properties文件，基础有driver、url、datasource、username、password，主要修改DataSource改为druid

   ```
   spring.datasource.name=com.alibaba.druid.pool.DruidDataSource
   spring.datasource.url=jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=utf8&autoReconnect=true&serverTimezone=Asia/Shanghai
   ```

3. 编写实体类，以student表为例，在封装的基础上，需要将当前的类**注册为一个实体、映射表明、声明主键、主键生成策略**、普通属性映射（如果名字相同，不需要设定，映射规则为驼峰命名法->下划线隔开命名法，例：className->class_name）

   ```
   @Entity
   @Table(name="student")
   public class Student implements Serializable {
   
   		@Id
   		@GeneratedValue(strategy = GenerationType.IDENTITY)
   		private Integer sno;
   		private String sname;
   		private String gender;
   		private Integer age;
   		private String school;
   		//此处省略getter和setter方法以及构造方法
   }
   ```

4. 编写数据访问层，相比于以前，只需要让接口继承**org.springframework.data.jpa.repository.JpaRepository**，自动获得基本的crud方法

   ```
   public interface ClazzRepository extends JpaRepository<Clazz, Integer> {
   
   }
   ```

5. 业务逻辑层照旧，注入数据访问层的bean，调用其对应的方法来完善业务逻辑方法
6. 编写控制层，注入业务逻辑层的bean，调用其对应的方法来完善服务方法

## springboot整合MyBatis-plus

1. pom.xml导入spring-web、mysql-driver、mybatis-plus构建项目

   ```
   		<dependency>
               <groupId>com.baomidou</groupId>
               <artifactId>mybatis-plus-boot-starter</artifactId>
               <version>3.4.2</version>
           </dependency>
   ```

2. 配置application.properties文件，基础有driver、url、datasource、username、password，主要修改DataSource改为druid

   ```
   spring.datasource.name=com.alibaba.druid.pool.DruidDataSource
   spring.datasource.url=jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=utf8&autoReconnect=true&serverTimezone=Asia/Shanghai
   ```

3. 编写实体类，需要映射但本质是用于获取resultMap，需要映射表、列以及主键

   ```
   @TableName(value = "classes")
   public class Classes implements Serializable {
   	@TableId(type = IdType.AUTO)
   	private Integer cid;
   	@TableField(value = "class_name")
   	private String className;
   	private String subject;
   	//此处省略getter和setter方法以及构造方法
   }
   ```

4. 编写数据访问层，继承**com.baomidou.mybatisplus.core.mapper.BaseMapper**，获得基本的crud方法

   ```
   public interface ClassesMapper extends BaseMapper<Classes> {
   	
   }
   ```

5. 编写业务逻辑层，继承**com.baomidou.mybatisplus.extension.service.IService**，获取基本的业务方法，<u>但是写的业务方法基本不适合正常做开发，其中涉及到缓存、事务、业务逻辑代码的编写，需要灵活应对，不应该自动生成</u>

   ```
   public interface ClassesService extends IService<Classes> {
   }
   ```

   ```
   @Service
   public class ClassesServiceImpl extends ServiceImpl<ClassesMapper,Classes> implements ClassesService   {
   }
   ```

6. 编写控制层，照旧！

7. 到springboot的启动器类中需要扫描mapper，注册为bean，方便注入

   ```
   @MapperScan("com.chinasofti.demo.dao")
   ```

   