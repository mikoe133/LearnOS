# Rocketmq

### 1 介绍

RocketMQ作为一款纯java、分布式、队列模型的开源消息中间件，支持事务消息、顺序消息、批量消息、定时消息、消息回溯等。

#### 1.1 RocketMQ 特点

支持发布/订阅（Pub/Sub）和点对点（P2P）消息模型

在一个队列中可靠的先进先出（FIFO）和严格的顺序传递 （RocketMQ可以保证严格的消息顺序，而ActiveMQ无法保证）

支持拉（pull）和推（push）两种消息模式

​		pull其实就是消费者主动从MQ中去拉消息，而push则像rabbit MQ一样，是MQ给消费者推送消息。但是RocketMQ的push其实是基于pull来实现的。
​		它会先由一个业务代码从MQ中pull消息，然后再由业务代码push给特定的应用/消费者。其实底层就是一个pull模式

单一队列百万消息的堆积能力 （RocketMQ提供亿级消息的堆积能力，这不是重点，重点是堆积了亿级的消息后，依然保持写入低延迟）

支持多种消息协议，如 JMS、MQTT 等

分布式高可用的部署架构,满足至少一次消息传递语义（RocketMQ原生就是支持分布式的，而ActiveMQ原生存在单点性）

提供 docker 镜像用于隔离测试和云集群部署

提供配置、指标和监控等功能丰富的 Dashboard

#### 1.2 RocketMQ 优势

目前主流的 MQ 主要是 RocketMQ、kafka、RabbitMQ，其主要优势有：

支持事务型消息（消息发送和 DB 操作保持两方的最终一致性，RabbitMQ 和 Kafka 不支持）
支持结合 RocketMQ 的多个系统之间数据最终一致性（多方事务，二方事务是前提）
支持 18 个级别的延迟消息（Kafka 不支持）
支持指定次数和时间间隔的失败消息重发（Kafka 不支持，RabbitMQ 需要手动确认）
支持 Consumer 端 Tag 过滤，减少不必要的网络传输（即过滤由MQ完成，而不是由消费者完成。RabbitMQ 和 Kafka 不支持）
支持重复消费（RabbitMQ 不支持，Kafka 支持）

### 2 RocketMQ 基本概念

RocketMQ主要有四大核心组成部分：**NameServer**、**Broker**、**Producer**以及**Consumer**四部分。

#### 2.1 NameServer

Name Server是一个几乎无状态节点，可集群部署，节点之间无任何信息同步。

NameServer 是整个 RocketMQ 的“大脑” ，它是 RocketMQ 的服务注册中心，所以 RocketMQ 需要先启动 NameServer 再启动 Rocket 中的 Broker。

#### 2.1.1 NameServer作用

名称服务器（NameServer）用来保存 Broker 相关元信息并给 Producer 和 Consumer 查找Broker 信息。NameServer 被设计成几乎无状态的，可以横向扩展，节点之间相互之间无通信，通过部署多台机器来标记自己是一个伪集群。

每个 Broker 在启动的时候会到 NameServer 注册，Producer 在发送消息前会根据 Topic 到NameServer 获取到 Broker 的路由信息，进而和Broker取得连接。Consumer 也会定时获取 Topic 的路由信息。所以从功能上看应该是和 ZooKeeper 差不多，据说 RocketMQ 的早期版本确实是使用的ZooKeeper ，后来改为了自己实现NameServer 。

#### 2.1.2 和zk的区别

Name Server和ZooKeeper的作用大致是相同的，从宏观上来看，Name Server做的东西很少，就是保存一些运行数据，Name Server之间不互连，这就需要broker端连接所有的Name Server，运行数据的改动要发送到每一个Name Server来保证运行数据的一致性（这个一致性确实有点弱），这样就变成了Name Server很轻量级，但是broker端就要做更多的东西了。

而ZooKeeper呢，broker只需要连接其中的一台机器，运行数据分发、一致性都交给了ZooKeeper来完成。

#### 2.1.3 高可用保障

Broker 在启动时向所有 NameServer 注册（主要是服务器地址等） ，生产者在发送消息之前先从NameServer 获取 Broker 服务器地址列表（消费者一样），然后根据负载均衡算法从列表中选择一台服务器进行消息发送。

NameServer 与每台 Broker 服务保持长连接，并间隔 30S 检查 Broker 是否存活，如果检测到Broker 宕机，则从路由注册表中将其移除，这样就可以实现 RocketMQ 的高可用。

#### 2.2 Broker

消息服务器（Broker）是消息存储中心，主要作用是接收来自 Producer 的消息并存储，Consumer 从这里取得消息。它还存储与消息相关的元数据，包括用户组、消费进度偏移量、队列信息等。从部署结构图中可以看出 Broker 有 Master 和 Slave 两种类型，Master 既可以写又可以读，Slave不可以写只可以读。

##### 2.2.1 部署方式

Broker部署相对复杂，Broker分为Master与Slave，一个Master可以对应多个Slave，但是一个Slave只能对应一个Master，Master与Slave的对应关系通过指定相同的Broker Name，不同的BrokerId来定义，BrokerId为0表Master，非0表示Slave。Master也可以部署多个。

从物理结构上看 Broker 的集群部署方式有四种：单 Master 、多 Master 、多 Master 多Slave（同步刷盘）、多 Master多 Slave（异步刷盘）。

###### 2.2.1.1 单 Master

这种方式一旦 Broker 重启或宕机会导致整个服务不可用，这种方式风险较大，所以显然不建议线上环境使用。

###### 2.2.1.2 多 Master

所有消息服务器都是 Master ，没有 Slave 。这种方式优点是配置简单，单个 Master 宕机或重启维护对应用无影响。缺点是单台机器宕机期间，该机器上未被消费的消息在机器恢复之前不可订阅，消息实时性会受影响。

###### 2.2.1.3 多 Master 多 Slave（异步复制）

每个 Master 配置一个 Slave，所以有多对 Master-Slave，消息采用异步复制方式，主备之间有毫秒级消息延迟。这种方式优点是消息丢失的非常少，且消息实时性不会受影响，Master 宕机后消费者可以继续从 Slave 消费，中间的过程对用户应用程序透明，不需要人工干预，性能同多 Master 方式几乎一样。缺点是 Master 宕机时在磁盘损坏情况下会丢失极少量消息。

###### 2.2.1.4 多 Master 多 Slave（同步双写）

每个 Master 配置一个 Slave，所以有多对 Master-Slave ，消息采用同步双写方式，主备都写成功才返回成功。这种方式优点是数据与服务都没有单点问题，Master 宕机时消息无延迟，服务与数据的可用性非常高。缺点是性能相对异步复制方式略低，发送消息的延迟会略高。

##### 2.2.2 高可用保障

每个Broker与Name Server集群中的所有节点建立长连接，定时(每隔30s)注册Topic信息到所有Name Server。Name Server定时(每隔10s)扫描所有存活broker的连接，如果Name Server超过2分钟没有收到心跳，则Name Server断开与Broker的连接。

#### 2.3 生产者（Producer）

也称为消息发布者，负责生产并发送消息至 Topic。
生产者向brokers发送由业务应用程序系统生成的消息。RocketMQ提供了发送：同步、异步和单向（one-way）的多种范例。

##### 2.3.1 同步发送

同步发送指消息发送方发出数据后会在收到接收方发回响应之后才发下一个数据包。一般用于重要通知消息，例如重要通知邮件、营销短信。

##### 2.3.2 异步发送

异步发送指发送方发出数据后，不等接收方发回响应，接着发送下个数据包，一般用于可能链路耗时较长而对响应时间敏感的业务场景，例如用户视频上传后通知启动转码服务。假如过一段时间检测到某个信息发送失败，可以选择重新发送。

##### 2.3.3 单向发送

单向发送是指只负责发送消息而不等待服务器回应且没有回调函数触发，适用于某些耗时非常短但对可靠性要求并不高的场景，例如日志收集。

##### 2.3.4 生产者组

生产者组（Producer Group）是一类 Producer 的集合，这类 Producer 通常发送一类消息并且发送逻辑一致，所以将这些 Producer 分组在一起。从部署结构上看生产者通过 Producer Group 的名字来标记自己是一个集群。

##### 2.3.5 高可用保障

Producer与Name Server集群中的其中一个节点(随机选择)建立长连接，定期从Name Server取Topic路由信息，并向提供Topic服务的Master建立长连接，且定时向Master发送心跳。Producer完全无状态，可集群部署。

Producer每隔30s（由ClientConfig的pollNameServerInterval）从Name server获取所有topic队列的最新情况，这意味着如果Broker不可用，Producer最多30s能够感知，在此期间内发往Broker的所有消息都会失败。

Producer每隔30s（由ClientConfig中heartbeatBrokerInterval决定）向所有关联的broker发送心跳，Broker每隔10s中扫描所有存活的连接，如果Broker在2分钟内没有收到心跳数据，则关闭与Producer的连接。

#### 2.4 消费者（Consumer）

也称为消息订阅者，负责从 Topic 接收并消费消息。
消费者从brokers那里拉取信息并将其输入应用程序。

##### 2.4.1 消费者组

消费者组（Consumer Group）一类 Consumer 的集合名称，这类 Consumer 通常消费同一类消息并且消费逻辑一致，所以将这些 Consumer 分组在一起。消费者组与生产者组类似，都是将相同角色的分组在一起并命名。

RocketMQ中的消息有个特点，同一条消息，只能被某一消费组其中的一台机器消费，但是可以同时被不同的消费组消费。

##### 2.4.2 高可用保障

Consumer与Name Server集群中的其中一个节点(随机选择)建立长连接，定期从Name Server取Topic路由信息，并向提供Topic服务的Master、Slave建立长连接，且定时向Master、Slave发送心跳。Consumer既可以从Master订阅消息，也可以从Slave订阅消息，订阅规则由Broker配置决定。

Consumer每隔30s从Name server获取topic的最新队列情况，这意味着Broker不可用时，Consumer最多最需要30s才能感知。

Consumer每隔30s（由ClientConfig中heartbeatBrokerInterval决定）向所有关联的broker发送心跳，Broker每隔10s扫描所有存活的连接，若某个连接2分钟内没有发送心跳数据，则关闭连接；并向该Consumer Group的所有Consumer发出通知，Group内的Consumer重新分配队列，然后继续消费。

当Consumer得到master宕机通知后，转向slave消费，slave不能保证master的消息100%都同步过来了，因此会有少量的消息丢失。但是一旦master恢复，未同步过去的消息会被最终消费掉。

#### 2.5 运转流程

NameServer 先启动
Broker 启动时向 NameServer 注册
生产者在发送某个主题的消息之前先从 NamerServer 获取 Broker 服务器地址列表（有可能是集群），然后根据负载均衡算法从列表中选择一台Broker 进行消息发送。
NameServer 与每台 Broker 服务器保持长连接，并间隔 30S 检测 Broker 是否存活，如果检测到Broker 宕机（使用心跳机制， 如果检测超120S），则从路由注册表中将其移除。
消费者在订阅某个主题的消息之前从 NamerServer 获取 Broker 服务器地址列表（有可能是集群），但是消费者选择从 Broker 中 订阅消息，订阅规则由 Broker 配置决定

## 使用范例

## 1 基本样例

在基本样例中我们提供如下的功能场景：

- 使用RocketMQ发送三种类型的消息：同步消息、异步消息和单向消息。其中前两种消息是可靠的，因为会有发送是否成功的应答。
- 使用RocketMQ来消费接收到的消息。

### 1.1 加入依赖：

```
maven:
<dependency>
    <groupId>org.apache.rocketmq</groupId>
    <artifactId>rocketmq-client</artifactId>
    <version>4.3.0</version>
</dependency>
gradle
APACHEcompile 'org.apache.rocketmq:rocketmq-client:4.3.0'
```

### 1.2 消息发送

#### 1、Producer端发送同步消息

这种可靠性同步地发送方式使用的比较广泛，比如：重要的消息通知，短信通知。

```java
public class SyncProducer {
	public static void main(String[] args) throws Exception {
    	// 实例化消息生产者Producer
        DefaultMQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");
    	// 设置NameServer的地址
    	producer.setNamesrvAddr("localhost:9876");
    	// 启动Producer实例
        producer.start();
    	for (int i = 0; i < 100; i++) {
    	    // 创建消息，并指定Topic，Tag和消息体
    	    Message msg = new Message("TopicTest" /* Topic */,
        	"TagA" /* Tag */,
        	("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET) /* Message body */
        	);
        	// 发送消息到一个Broker
            SendResult sendResult = producer.send(msg);
            // 通过sendResult返回消息是否成功送达
            System.out.printf("%s%n", sendResult);
    	}
    	// 如果不再发送消息，关闭Producer实例。
    	producer.shutdown();
    }
}
```

#### 2、发送异步消息

异步消息通常用在对响应时间敏感的业务场景，即发送端不能容忍长时间地等待Broker的响应。

```java
public class AsyncProducer {
	public static void main(String[] args) throws Exception {
    	// 实例化消息生产者Producer
        DefaultMQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");
    	// 设置NameServer的地址
        producer.setNamesrvAddr("localhost:9876");
    	// 启动Producer实例
        producer.start();
        producer.setRetryTimesWhenSendAsyncFailed(0);
	
	int messageCount = 100;
        // 根据消息数量实例化倒计时计算器
	final CountDownLatch2 countDownLatch = new CountDownLatch2(messageCount);
    	for (int i = 0; i < messageCount; i++) {
                final int index = i;
            	// 创建消息，并指定Topic，Tag和消息体
                Message msg = new Message("TopicTest",
                    "TagA",
                    "OrderID188",
                    "Hello world".getBytes(RemotingHelper.DEFAULT_CHARSET));
                // SendCallback接收异步返回结果的回调
                producer.send(msg, new SendCallback() {
                    @Override
                    public void onSuccess(SendResult sendResult) {
                        System.out.printf("%-10d OK %s %n", index,
                            sendResult.getMsgId());
                    }
                    @Override
                    public void onException(Throwable e) {
      	              System.out.printf("%-10d Exception %s %n", index, e);
      	              e.printStackTrace();
                    }
            	});
    	}
	// 等待5s
	countDownLatch.await(5, TimeUnit.SECONDS);
    	// 如果不再发送消息，关闭Producer实例。
    	producer.shutdown();
    }
}
```

#### 3、单向发送消息

这种方式主要用在不特别关心发送结果的场景，例如日志发送。

```java
public class OnewayProducer {
	public static void main(String[] args) throws Exception{
    	// 实例化消息生产者Producer
        DefaultMQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");
    	// 设置NameServer的地址
        producer.setNamesrvAddr("localhost:9876");
    	// 启动Producer实例
        producer.start();
    	for (int i = 0; i < 100; i++) {
        	// 创建消息，并指定Topic，Tag和消息体
        	Message msg = new Message("TopicTest" /* Topic */,
                "TagA" /* Tag */,
                ("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET) /* Message body */
        	);
        	// 发送单向消息，没有任何返回结果
        	producer.sendOneway(msg);

    	}
    	// 如果不再发送消息，关闭Producer实例。
    	producer.shutdown();
    }
}
```

### 1.3 消费消息

```java
public class Consumer {

	public static void main(String[] args) throws InterruptedException, MQClientException {

    	// 实例化消费者
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("please_rename_unique_group_name");

    	// 设置NameServer的地址
        consumer.setNamesrvAddr("localhost:9876");

    	// 订阅一个或者多个Topic，以及Tag来过滤需要消费的消息
        consumer.subscribe("TopicTest", "*");
    	// 注册回调实现类来处理从broker拉取回来的消息
        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                System.out.printf("%s Receive New Messages: %s %n", Thread.currentThread().getName(), msgs);
                // 标记该消息已经被成功消费
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });
        // 启动消费者实例
        consumer.start();
        System.out.printf("Consumer Started.%n");
	}
}
```

## 2 顺序消息样例

消息有序指的是可以按照消息的发送顺序来消费(FIFO)。RocketMQ可以严格的保证消息有序，可以分为分区有序或者全局有序。

顺序消费的原理解析，在默认的情况下消息发送会采取Round Robin轮询方式把消息发送到不同的queue(分区队列)；而消费消息的时候从多个queue上拉取消息，这种情况发送和消费是不能保证顺序。但是如果控制发送的**顺序消息只依次发送到同一个queue**中，消费的时候只从这个queue上依次拉取，则就保证了顺序。当发送和消费参与的queue只有一个，则是全局有序；如果多个queue参与，则为分区有序，即相对每个queue，消息都是有序的。

下面用订单进行分区有序的示例。一个订单的顺序流程是：创建、付款、推送、完成。订单号相同的消息会被先后发送到同一个队列中，消费时，同一个OrderId获取到的肯定是同一个队列。

### 2.1 顺序消息生产

```java
package org.apache.rocketmq.example.order2;

import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.client.producer.MessageQueueSelector;
import org.apache.rocketmq.client.producer.SendResult;
import org.apache.rocketmq.common.message.Message;
import org.apache.rocketmq.common.message.MessageQueue;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
* Producer，发送顺序消息
*/
public class Producer {

   public static void main(String[] args) throws Exception {
       DefaultMQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");

       producer.setNamesrvAddr("127.0.0.1:9876");

       producer.start();

       String[] tags = new String[]{"TagA", "TagC", "TagD"};

       // 订单列表
       List<OrderStep> orderList = new Producer().buildOrders();

       Date date = new Date();
       SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
       String dateStr = sdf.format(date);
       for (int i = 0; i < 10; i++) {
           // 加个时间前缀
           String body = dateStr + " Hello RocketMQ " + orderList.get(i);
           Message msg = new Message("TopicTest", tags[i % tags.length], "KEY" + i, body.getBytes());
			//tagA   15103111039L创建     queue1                                     
            //tagC   15103111065L创建     queue2
           //tagD    15103111039L付款     queue1
           //tagA   15103117235L创建      queue3
           //tagC   15103111065L付款      queue2
           //tagD   15103117235L付款      queue3
           //tagA   15103111065L完成     queue2
           //tagC   15103111039L推送     queue1
           //tagD   15103117235L完成     queue3
           //tagA	15103111039L完成     queue1
           SendResult sendResult = producer.send(msg, new MessageQueueSelector() {
               @Override
               public MessageQueue select(List<MessageQueue> mqs, Message msg, Object arg) {
                   Long id = (Long) arg;  //根据订单id选择发送queue
                   long index = id % mqs.size();
                   return mqs.get((int) index);
               }
           }, orderList.get(i).getOrderId());//订单id

           System.out.println(String.format("SendResult status:%s, queueId:%d, body:%s",
               sendResult.getSendStatus(),
               sendResult.getMessageQueue().getQueueId(),
               body));
       }

       producer.shutdown();
   }

   /**
    * 订单的步骤
    */
   private static class OrderStep {
       private long orderId;//订单编号
       private String desc;//类型

       public long getOrderId() {
           return orderId;
       }

       public void setOrderId(long orderId) {
           this.orderId = orderId;
       }

       public String getDesc() {
           return desc;
       }

       public void setDesc(String desc) {
           this.desc = desc;
       }

       @Override
       public String toString() {
           return "OrderStep{" +
               "orderId=" + orderId +
               ", desc='" + desc + '\'' +
               '}';
       }
   }

   /**
    * 生成模拟订单数据
    */
   private List<OrderStep> buildOrders() {
       List<OrderStep> orderList = new ArrayList<OrderStep>();

       OrderStep orderDemo = new OrderStep();
       orderDemo.setOrderId(15103111039L);
       orderDemo.setDesc("创建");
       orderList.add(orderDemo);

       orderDemo = new OrderStep();
       orderDemo.setOrderId(15103111065L);
       orderDemo.setDesc("创建");
       orderList.add(orderDemo);

       orderDemo = new OrderStep();
       orderDemo.setOrderId(15103111039L);
       orderDemo.setDesc("付款");
       orderList.add(orderDemo);

       orderDemo = new OrderStep();
       orderDemo.setOrderId(15103117235L);
       orderDemo.setDesc("创建");
       orderList.add(orderDemo);

       orderDemo = new OrderStep();
       orderDemo.setOrderId(15103111065L);
       orderDemo.setDesc("付款");
       orderList.add(orderDemo);

       orderDemo = new OrderStep();
       orderDemo.setOrderId(15103117235L);
       orderDemo.setDesc("付款");
       orderList.add(orderDemo);

       orderDemo = new OrderStep();
       orderDemo.setOrderId(15103111065L);
       orderDemo.setDesc("完成");
       orderList.add(orderDemo);

       orderDemo = new OrderStep();
       orderDemo.setOrderId(15103111039L);
       orderDemo.setDesc("推送");
       orderList.add(orderDemo);

       orderDemo = new OrderStep();
       orderDemo.setOrderId(15103117235L);
       orderDemo.setDesc("完成");
       orderList.add(orderDemo);
	
       orderDemo = new OrderStep();
       orderDemo.setOrderId(15103111039L);
       orderDemo.setDesc("完成");
       orderList.add(orderDemo);

       return orderList;
   }
}
```

### 2.2 顺序消费消息

```java
package org.apache.rocketmq.example.order2;

import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
import org.apache.rocketmq.client.consumer.listener.ConsumeOrderlyContext;
import org.apache.rocketmq.client.consumer.listener.ConsumeOrderlyStatus;
import org.apache.rocketmq.client.consumer.listener.MessageListenerOrderly;
import org.apache.rocketmq.common.consumer.ConsumeFromWhere;
import org.apache.rocketmq.common.message.MessageExt;

import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

/**
* 顺序消息消费，带事务方式（应用可控制Offset什么时候提交）
*/
public class ConsumerInOrder {

   public static void main(String[] args) throws Exception {
       DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("please_rename_unique_group_name_3");
       consumer.setNamesrvAddr("127.0.0.1:9876");
       /**
        * 设置Consumer第一次启动是从队列头部开始消费还是队列尾部开始消费<br>
        * 如果非第一次启动，那么按照上次消费的位置继续消费
        */
       consumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_FIRST_OFFSET);

       consumer.subscribe("TopicTest", "TagA || TagC || TagD");

       consumer.registerMessageListener(new MessageListenerOrderly() {

           Random random = new Random();

           @Override
           public ConsumeOrderlyStatus consumeMessage(List<MessageExt> msgs, ConsumeOrderlyContext context) {
               context.setAutoCommit(true);
               for (MessageExt msg : msgs) {
                   // 可以看到每个queue有唯一的consume线程来消费, 订单对每个queue(分区)有序
                   System.out.println("consumeThread=" + Thread.currentThread().getName() + "queueId=" + msg.getQueueId() + ", content:" + new String(msg.getBody()));
               }

               try {
                   //模拟业务逻辑处理中...
                   TimeUnit.SECONDS.sleep(random.nextInt(10));
               } catch (Exception e) {
                   e.printStackTrace();
               }
               return ConsumeOrderlyStatus.SUCCESS;
           }
       });

       consumer.start();

       System.out.println("Consumer Started.");
   }
}
```

## 3 延时消息样例

### 3.1 启动消费者等待传入订阅消息

```java

import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;
import org.apache.rocketmq.common.message.MessageExt;
import java.util.List;

public class ScheduledMessageConsumer {
   public static void main(String[] args) throws Exception {
      // 实例化消费者
      DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ExampleConsumer");
      consumer.setNamesrvAddr("127.0.0.1:9876");
      // 订阅Topics
      consumer.subscribe("TestTopic", "*");
      // 注册消息监听者
      consumer.registerMessageListener(new MessageListenerConcurrently() {
          @Override
          public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> messages, ConsumeConcurrentlyContext context) {
              for (MessageExt message : messages) {
                  // Print approximate delay time period
                  System.out.println("Receive message[msgId=" + message.getMsgId() + "] " + (System.currentTimeMillis() - message.getBornTimestamp()) + "ms later");
              }
              return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
          }
      });
      // 启动消费者
      consumer.start();
  }
}
```

### 3.2 发送延时消息

```java

import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.common.message.Message;

public class ScheduledMessageProducer {
   public static void main(String[] args) throws Exception {
      // 实例化一个生产者来产生延时消息
      DefaultMQProducer producer = new DefaultMQProducer("ExampleProducerGroup");
      producer.setNamesrvAddr("127.0.0.1:9876");
      // 启动生产者
      producer.start();
      int totalMessagesToSend = 100;
      for (int i = 0; i < totalMessagesToSend; i++) {
          Message message = new Message("TestTopic", ("Hello scheduled message " + i).getBytes());
          // 设置延时等级3,这个消息将在10s之后发送(现在只支持固定的几个时间,详看delayTimeLevel)
          message.setDelayTimeLevel(3);
          // 发送消息
          producer.send(message);
      }
       // 关闭生产者
      producer.shutdown();
  }
}
```

### 3.3 验证

您将会看到消息的消费比存储时间晚10秒。

### 3.4 延时消息的使用场景

比如电商里，提交了一个订单就可以发送一个延时消息，1h后去检查这个订单的状态，如果还是未付款就取消订单释放库存。

### 3.5 延时消息的使用限制

```java
// org/apache/rocketmq/store/config/MessageStoreConfig.java

private String messageDelayLevel = "1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h";
```

现在RocketMq并不支持任意时间的延时，需要设置几个固定的延时等级，从1s到2h分别对应着等级1到18
消息消费失败会进入延时消息队列，消息发送时间与设置的延时等级和重试次数有关，详见代码`SendMessageProcessor.java`

## 4 批量消息样例

批量发送消息能显著提高传递小消息的性能。限制是这些批量消息应该有相同的topic，相同的waitStoreMsgOK，而且不能是延时消息。此外，这一批消息的总大小不应超过4MB。

### 4.1 发送批量消息

如果您每次只发送不超过4MB的消息，则很容易使用批处理，样例如下：

```java
String topic = "BatchTest";
List<Message> messages = new ArrayList<>();
messages.add(new Message(topic, "TagA", "OrderID001", "Hello world 0".getBytes()));
messages.add(new Message(topic, "TagA", "OrderID002", "Hello world 1".getBytes()));
messages.add(new Message(topic, "TagA", "OrderID003", "Hello world 2".getBytes()));
try {
   producer.send(messages);
} catch (Exception e) {
   e.printStackTrace();
   //处理error
}
```

### 4.2 消息列表分割

复杂度只有当你发送大批量时才会增长，你可能不确定它是否超过了大小限制（4MB）。这时候你最好把你的消息列表分割一下：

```java
public class ListSplitter implements Iterator<List<Message>> { 
    private final int SIZE_LIMIT = 1024 * 1024 * 4;
    private final List<Message> messages;
    private int currIndex;
    public ListSplitter(List<Message> messages) { 
        this.messages = messages;
    }
    @Override public boolean hasNext() {
        return currIndex < messages.size(); 
    }
    @Override public List<Message> next() { 
        int startIndex = getStartIndex();
        int nextIndex = startIndex;
        int totalSize = 0;
        for (; nextIndex < messages.size(); nextIndex++) {
            Message message = messages.get(nextIndex); 
            int tmpSize = calcMessageSize(message);
            if (tmpSize + totalSize > SIZE_LIMIT) {
                break; 
            } else {
                totalSize += tmpSize; 
            }
        }
        List<Message> subList = messages.subList(startIndex, nextIndex); 
        currIndex = nextIndex;
        return subList;
    }
    private int getStartIndex() {
        Message currMessage = messages.get(currIndex); 
        int tmpSize = calcMessageSize(currMessage); 
        while(tmpSize > SIZE_LIMIT) {
            currIndex += 1;
            Message message = messages.get(curIndex); 
            tmpSize = calcMessageSize(message);
        }
        return currIndex; 
    }
    private int calcMessageSize(Message message) {
        int tmpSize = message.getTopic().length() + message.getBody().length(); 
        Map<String, String> properties = message.getProperties();
        for (Map.Entry<String, String> entry : properties.entrySet()) {
            tmpSize += entry.getKey().length() + entry.getValue().length(); 
        }
        tmpSize = tmpSize + 20; // 增加⽇日志的开销20字节
        return tmpSize; 
    }
}
//把大的消息分裂成若干个小的消息
ListSplitter splitter = new ListSplitter(messages);
while (splitter.hasNext()) {
  try {
      List<Message>  listItem = splitter.next();
      producer.send(listItem);
  } catch (Exception e) {
      e.printStackTrace();
      //处理error
  }
}
```

## 5 过滤消息样例

在大多数情况下，TAG是一个简单而有用的设计，其可以来选择您想要的消息。例如：

```java
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("CID_EXAMPLE");
consumer.subscribe("TOPIC", "TAGA || TAGB || TAGC");
```

消费者将接收包含TAGA或TAGB或TAGC的消息。但是限制是一个消息只能有一个标签，这对于复杂的场景可能不起作用。在这种情况下，可以使用SQL表达式筛选消息。SQL特性可以通过发送消息时的属性来进行计算。在RocketMQ定义的语法下，可以实现一些简单的逻辑。下面是一个例子：

```
------------
| message  |
|----------|  a > 5 AND b = 'abc'
| a = 10   |  --------------------> Gotten
| b = 'abc'|
| c = true |
------------
------------
| message  |
|----------|   a > 5 AND b = 'abc'
| a = 1    |  --------------------> Missed
| b = 'abc'|
| c = true |
------------
```

### 5.1 基本语法

RocketMQ只定义了一些基本语法来支持这个特性。你也可以很容易地扩展它。

- 数值比较，比如：**>，>=，<，<=，BETWEEN，=；**
- 字符比较，比如：**=，<>，IN；**
- **IS NULL** 或者 **IS NOT NULL；**
- 逻辑符号 **AND，OR，NOT；**

常量支持类型为：

- 数值，比如：**123，3.1415；**
- 字符，比如：**'abc'，必须用单引号包裹起来；**
- **NULL**，特殊的常量
- 布尔值，**TRUE** 或 **FALSE**

只有使用push模式的消费者才能用使用SQL92标准的sql语句，接口如下：

```

CPPpublic void subscribe(finalString topic, final MessageSelector messageSelector)
```

### 5.2 使用样例

#### 1、生产者样例

发送消息时，你能通过`putUserProperty`来设置消息的属性

```java
DefaultMQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");
producer.start();
for(int i=0;i<10;i++){
    Message msg = new Message("TopicTest",tag,("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET));
	// 设置一些属性
	msg.putUserProperty("a", String.valueOf(i));
	SendResult sendResult = producer.send(msg);
}

producer.shutdown();
```

#### 2、消费者样例

用MessageSelector.bySql来使用sql筛选消息

```java
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("please_rename_unique_group_name_4");
// 只有订阅的消息有这个属性a, a >=0 and a <= 3
consumer.subscribe("TopicTest", MessageSelector.bySql("a between 0 and 3");
consumer.registerMessageListener(new MessageListenerConcurrently() {
   @Override
   public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
       return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
   }
});
consumer.start();
```

## 6 消息事务样例

事务消息共有三种状态，提交状态、回滚状态、中间状态：

- TransactionStatus.CommitTransaction: 提交事务，它允许消费者消费此消息。
- TransactionStatus.RollbackTransaction: 回滚事务，它代表该消息将被删除，不允许被消费。
- TransactionStatus.Unknown: 中间状态，它代表需要检查消息队列来确定状态。

### 6.1 发送事务消息样例

#### 1、创建事务性生产者

使用 `TransactionMQProducer`类创建生产者，并指定唯一的 `ProducerGroup`，就可以设置自定义线程池来处理这些检查请求。执行本地事务后、需要根据执行结果对消息队列进行回复。回传的事务状态在请参考前一节。

```java
import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;
import org.apache.rocketmq.common.message.MessageExt;
import java.util.List;
public class TransactionProducer {
   public static void main(String[] args) throws MQClientException, InterruptedException {
       TransactionListener transactionListener = new TransactionListenerImpl();
       TransactionMQProducer producer = new TransactionMQProducer("please_rename_unique_group_name");
       ExecutorService executorService = new ThreadPoolExecutor(2, 5, 100, TimeUnit.SECONDS, new ArrayBlockingQueue<Runnable>(2000), new ThreadFactory() {
           @Override
           public Thread newThread(Runnable r) {
               Thread thread = new Thread(r);
               thread.setName("client-transaction-msg-check-thread");
               return thread;
           }
       });
       producer.setExecutorService(executorService);
       producer.setTransactionListener(transactionListener);
       producer.start();
       String[] tags = new String[] {"TagA", "TagB", "TagC", "TagD", "TagE"};
       for (int i = 0; i < 10; i++) {
           try {
               Message msg =
                   new Message("TopicTest1234", tags[i % tags.length], "KEY" + i,
                       ("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET));
               SendResult sendResult = producer.sendMessageInTransaction(msg, null);
               System.out.printf("%s%n", sendResult);
               Thread.sleep(10);
           } catch (MQClientException | UnsupportedEncodingException e) {
               e.printStackTrace();
           }
       }
       for (int i = 0; i < 100000; i++) {
           Thread.sleep(1000);
       }
       producer.shutdown();
   }
}
```

#### 2、实现事务的监听接口

当发送半消息成功时，我们使用 `executeLocalTransaction` 方法来执行本地事务。它返回前一节中提到的三个事务状态之一。`checkLocalTransaction` 方法用于检查本地事务状态，并回应消息队列的检查请求。它也是返回前一节中提到的三个事务状态之一。

```java
public class TransactionListenerImpl implements TransactionListener {
  private AtomicInteger transactionIndex = new AtomicInteger(0);
  private ConcurrentHashMap<String, Integer> localTrans = new ConcurrentHashMap<>();
  @Override
  public LocalTransactionState executeLocalTransaction(Message msg, Object arg) {
      int value = transactionIndex.getAndIncrement();
      int status = value % 3;
      localTrans.put(msg.getTransactionId(), status);
      return LocalTransactionState.UNKNOW;
  }
  @Override
  public LocalTransactionState checkLocalTransaction(MessageExt msg) {
      Integer status = localTrans.get(msg.getTransactionId());
      if (null != status) {
          switch (status) {
              case 0:
                  return LocalTransactionState.UNKNOW;
              case 1:
                  return LocalTransactionState.COMMIT_MESSAGE;
              case 2:
                  return LocalTransactionState.ROLLBACK_MESSAGE;
          }
      }
      return LocalTransactionState.COMMIT_MESSAGE;
  }
}
```

### 6.2 事务消息使用上的限制

1. 事务消息不支持延时消息和批量消息。
2. 为了避免单个消息被检查太多次而导致半队列消息累积，我们默认将单个消息的检查次数限制为 15 次，但是用户可以通过 Broker 配置文件的 `transactionCheckMax`参数来修改此限制。如果已经检查某条消息超过 N 次的话（ N = `transactionCheckMax` ） 则 Broker 将丢弃此消息，并在默认情况下同时打印错误日志。用户可以通过重写 `AbstractTransactionalMessageCheckListener` 类来修改这个行为。
3. 事务消息将在 Broker 配置文件中的参数 transactionTimeout 这样的特定时间长度之后被检查。当发送事务消息时，用户还可以通过设置用户属性 CHECK_IMMUNITY_TIME_IN_SECONDS 来改变这个限制，该参数优先于 `transactionTimeout` 参数。
4. 事务性消息可能不止一次被检查或消费。
5. 提交给用户的目标主题消息可能会失败，目前这依日志的记录而定。它的高可用性通过 RocketMQ 本身的高可用性机制来保证，如果希望确保事务消息不丢失、并且事务完整性得到保证，建议使用同步的双重写入机制。
6. 事务消息的生产者 ID 不能与其他类型消息的生产者 ID 共享。与其他类型的消息不同，事务消息允许反向查询、MQ服务器能通过它们的生产者 ID 查询到消费者。

## 7 Logappender样例

RocketMQ日志提供log4j、log4j2和logback日志框架作为业务应用，下面是配置样例

### 7.1 log4j样例

按下面样例使用log4j属性配置

```
log4j.appender.mq=org.apache.rocketmq.logappender.log4j.RocketmqLog4jAppender
log4j.appender.mq.Tag=yourTag
log4j.appender.mq.Topic=yourLogTopic
log4j.appender.mq.ProducerGroup=yourLogGroup
log4j.appender.mq.NameServerAddress=yourRocketmqNameserverAddress
log4j.appender.mq.layout=org.apache.log4j.PatternLayout
log4j.appender.mq.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-4r [%t] (%F:%L) %-5p - %m%n
```

按下面样例使用log4j xml配置来使用异步添加日志

```
<appender name="mqAppender1"class="org.apache.rocketmq.logappender.log4j.RocketmqLog4jAppender">
  <param name="Tag" value="yourTag" />
  <param name="Topic" value="yourLogTopic" />
  <param name="ProducerGroup" value="yourLogGroup" />
  <param name="NameServerAddress" value="yourRocketmqNameserverAddress"/>
  <layout class="org.apache.log4j.PatternLayout">
      <param name="ConversionPattern" value="%d{yyyy-MM-dd HH:mm:ss}-%p %t %c - %m%n" />
  </layout>
</appender>
<appender name="mqAsyncAppender1"class="org.apache.log4j.AsyncAppender">
  <param name="BufferSize" value="1024" />
  <param name="Blocking" value="false" />
  <appender-ref ref="mqAppender1"/>
</appender>
```

### 7.2 log4j2样例

用log4j2时，配置如下，如果想要非阻塞，只需要使用异步添加引用即可

```
<RocketMQ name="rocketmqAppender" producerGroup="yourLogGroup" nameServerAddress="yourRocketmqNameserverAddress"
   topic="yourLogTopic" tag="yourTag">
  <PatternLayout pattern="%d [%p] hahahah %c %m%n"/>
</RocketMQ>
```

### 7.3 logback样例

```
<appender name="mqAppender1"class="org.apache.rocketmq.logappender.logback.RocketmqLogbackAppender">
  <tag>yourTag</tag>
  <topic>yourLogTopic</topic>
  <producerGroup>yourLogGroup</producerGroup>
  <nameServerAddress>yourRocketmqNameserverAddress</nameServerAddress>
  <layout>
      <pattern>%date %p %t - %m%n</pattern>
  </layout>
</appender>
<appender name="mqAsyncAppender1"class="ch.qos.logback.classic.AsyncAppender">
  <queueSize>1024</queueSize>
  <discardingThreshold>80</discardingThreshold>
  <maxFlushTime>2000</maxFlushTime>
  <neverBlock>true</neverBlock>
  <appender-ref ref="mqAppender1"/>
</appender>
```

## 8 OpenMessaging样例

[OpenMessaging](https://www.google.com/url?q=http://openmessaging.cloud/&sa=D&ust=1546524111089000)旨在建立消息和流处理规范，以为金融、电子商务、物联网和大数据领域提供通用框架及工业级指导方案。在分布式异构环境中，设计原则是面向云、简单、灵活和独立于语言。符合这些规范将帮助企业方便的开发跨平台和操作系统的异构消息传递应用程序。提供了openmessaging-api 0.3.0-alpha的部分实现，下面的示例演示如何基于OpenMessaging访问RocketMQ。

### 8.1 OMSProducer样例

下面的示例演示如何在同步、异步或单向传输中向RocketMQ代理发送消息。

```java
import io.openmessaging.Future;
import io.openmessaging.FutureListener;
import io.openmessaging.Message;
import io.openmessaging.MessagingAccessPoint;
import io.openmessaging.OMS;
import io.openmessaging.producer.Producer;
import io.openmessaging.producer.SendResult;
import java.nio.charset.Charset;
import java.util.concurrent.CountDownLatch;

public class SimpleProducer {
    public static void main(String[] args) {
       final MessagingAccessPoint messagingAccessPoint =
           OMS.getMessagingAccessPoint("oms:rocketmq://localhost:9876/default:default");
       final Producer producer = messagingAccessPoint.createProducer();
       messagingAccessPoint.startup();
       System.out.printf("MessagingAccessPoint startup OK%n");
       producer.startup();
       System.out.printf("Producer startup OK%n");
       {
           Message message = producer.createBytesMessage("OMS_HELLO_TOPIC", "OMS_HELLO_BODY".getBytes(Charset.forName("UTF-8")));
           SendResult sendResult = producer.send(message);
           //final Void aVoid = result.get(3000L);
           System.out.printf("Send async message OK, msgId: %s%n", sendResult.messageId());
       }
       final CountDownLatch countDownLatch = new CountDownLatch(1);
       {
           final Future<SendResult> result = producer.sendAsync(producer.createBytesMessage("OMS_HELLO_TOPIC", "OMS_HELLO_BODY".getBytes(Charset.forName("UTF-8"))));
           result.addListener(new FutureListener<SendResult>() {
               @Override
               public void operationComplete(Future<SendResult> future) {
                   if (future.getThrowable() != null) {
                       System.out.printf("Send async message Failed, error: %s%n", future.getThrowable().getMessage());
                   } else {
                       System.out.printf("Send async message OK, msgId: %s%n", future.get().messageId());
                   }
                   countDownLatch.countDown();
               }
           });
       }
       {
           producer.sendOneway(producer.createBytesMessage("OMS_HELLO_TOPIC", "OMS_HELLO_BODY".getBytes(Charset.forName("UTF-8"))));
           System.out.printf("Send oneway message OK%n");
       }
       try {
           countDownLatch.await();
           Thread.sleep(500); // 等一些时间来发送消息
       } catch (InterruptedException ignore) {
       }
       producer.shutdown();
   }
}
```

### 8.2 OMSPullConsumer

用OMS PullConsumer 来从指定的队列中拉取消息

```java
import io.openmessaging.Message;
import io.openmessaging.MessagingAccessPoint;
import io.openmessaging.OMS;
import io.openmessaging.OMSBuiltinKeys;
import io.openmessaging.consumer.PullConsumer;
import io.openmessaging.producer.Producer;
import io.openmessaging.producer.SendResult;

public class SimplePullConsumer {
    public static void main(String[] args) {
       final MessagingAccessPoint messagingAccessPoint =
           OMS.getMessagingAccessPoint("oms:rocketmq://localhost:9876/default:default");
       messagingAccessPoint.startup();
       final Producer producer = messagingAccessPoint.createProducer();
       final PullConsumer consumer = messagingAccessPoint.createPullConsumer(
           OMS.newKeyValue().put(OMSBuiltinKeys.CONSUMER_ID, "OMS_CONSUMER"));
       messagingAccessPoint.startup();
       System.out.printf("MessagingAccessPoint startup OK%n");
       final String queueName = "TopicTest";
       producer.startup();
       Message msg = producer.createBytesMessage(queueName, "Hello Open Messaging".getBytes());
       SendResult sendResult = producer.send(msg);
       System.out.printf("Send Message OK. MsgId: %s%n", sendResult.messageId());
       producer.shutdown();
       consumer.attachQueue(queueName);
       consumer.startup();
       System.out.printf("Consumer startup OK%n");
       // 运行直到发现一个消息被发送了
       boolean stop = false;
       while (!stop) {
           Message message = consumer.receive();
           if (message != null) {
               String msgId = message.sysHeaders().getString(Message.BuiltinKeys.MESSAGE_ID);
               System.out.printf("Received one message: %s%n", msgId);
               consumer.ack(msgId);
               if (!stop) {
                   stop = msgId.equalsIgnoreCase(sendResult.messageId());
               }
           } else {
               System.out.printf("Return without any message%n");
           }
       }
       consumer.shutdown();
       messagingAccessPoint.shutdown();
   }
}
```

### 8.3 OMSPushConsumer

以下示范如何将 OMS PushConsumer 添加到指定的队列，并通过 MessageListener 消费这些消息。

```java
import io.openmessaging.Message;
import io.openmessaging.MessagingAccessPoint;
import io.openmessaging.OMS;
import io.openmessaging.OMSBuiltinKeys;
import io.openmessaging.consumer.MessageListener;
import io.openmessaging.consumer.PushConsumer;

public class SimplePushConsumer {
    public static void main(String[] args) {
       final MessagingAccessPoint messagingAccessPoint = OMS
           .getMessagingAccessPoint("oms:rocketmq://localhost:9876/default:default");
       final PushConsumer consumer = messagingAccessPoint.
           createPushConsumer(OMS.newKeyValue().put(OMSBuiltinKeys.CONSUMER_ID, "OMS_CONSUMER"));
       messagingAccessPoint.startup();
       System.out.printf("MessagingAccessPoint startup OK%n");
       Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
           @Override
           public void run() {
               consumer.shutdown();
               messagingAccessPoint.shutdown();
           }
       }));
       consumer.attachQueue("OMS_HELLO_TOPIC", new MessageListener() {
           @Override
           public void onReceived(Message message, Context context) {
               System.out.printf("Received one message: %s%n", message.sysHeaders().getString(Message.BuiltinKeys.MESSAGE_ID));
               context.ack();
           }
       });
       consumer.startup();
       System.out.printf("Consumer startup OK%n");
   }
}
```

# springboot整合rocketmq

## 1 rocketmq-spring-boot-starter方式

​		此方式由apache和rocketmq合作研发，提供RocketMQTemplate类进行基本操作，包含普通消息、异步消息、延迟消息等常用api，配置极简非常方便，但问题在于发布的版本很少，低版本不支持，对于复杂业务场景的支持比较差，目前人气不高。

producer项目：

1. 加入依赖

   ```
   		<dependency>
   			<groupId>org.apache.rocketmq</groupId>
   			<artifactId>rocketmq-spring-boot-starter</artifactId>
   			<version>2.1.1</version>
   		</dependency>
   		要求rocketmq版本与rocketmq.client版本对应，可以去maven仓库找寻
   ```

2. application.properties配置

   ```
   rocketmq.name-server=127.0.0.1:9876  #borker地址
   rocketmq.producer.group=rocketmq_test_producer   #消息提供者组名
   rocketmq.producer.send-message-timeout=3000  #过期时间
   ```

3. Api

   ```
   //发送普通同步消息-Object
   syncSend(String destination, Object payload)
   //发送普通同步消息-Message
   syncSend(String destination, Message<?> message)
   //发送批量普通同步消息
   syncSend(String destination, Collection<T> messages)
   //发送普通同步消息-Object，并设置发送超时时间
   syncSend(String destination, Object payload, long timeout)
   //发送普通同步消息-Message，并设置发送超时时间
   syncSend(String destination, Message<?> message, long timeout)
   //发送批量普通同步消息，并设置发送超时时间
   syncSend(String destination, Collection<T> messages, long timeout)
   //发送普通同步延迟消息，并设置超时，这个下文会演示
   syncSend(String destination, Message<?> message, long timeout, int delayLevel)
   
   
   
   //发送普通异步消息-Object
   asyncSend(String destination, Object payload, SendCallback sendCallback)
   //发送普通异步消息-Message
   asyncSend(String destination, Message<?> message, SendCallback sendCallback)
   //发送普通异步消息-Object，并设置发送超时时间
   asyncSend(String destination, Object payload, SendCallback sendCallback, long timeout)
   //发送普通异步消息-Message，并设置发送超时时间
   asyncSend(String destination, Message<?> message, SendCallback sendCallback, long timeout)
   //发送普通异步延迟消息，并设置超时，这个下文会演示
   asyncSend(String destination, Message<?> message, SendCallback sendCallback, long timeout,
           int delayLevel) 
   
   ```
   
   
   
4. 定义消息体

   ```
   public class MsgContent {
   
       private Integer id;
   
       private String context;
   
       private Date date;
   
   }
   ```

   

5. 编写service

   ```
   package com.chinasofti.demo.service.impl;
   
   import java.util.List;
   
   import org.apache.rocketmq.client.producer.SendCallback;
   import org.apache.rocketmq.client.producer.SendResult;
   import org.apache.rocketmq.spring.core.RocketMQTemplate;
   import org.slf4j.Logger;
   import org.slf4j.LoggerFactory;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.beans.factory.annotation.Value;
   import org.springframework.messaging.Message;
   import org.springframework.messaging.support.MessageBuilder;
   import org.springframework.stereotype.Service;
   
   import com.chinasofti.demo.domain.MsgContent;
   import com.chinasofti.demo.service.RocketmqProducerService;
   
   @Service
   public class RocketmqProducerServiceImpl implements RocketmqProducerService {
   	@Autowired
   	private RocketMQTemplate rt;
   	
   	@Value("${rocketmq.producer.send-message-timeout}")
   	private Integer messagetimeOut;
   	private Logger log=LoggerFactory.getLogger(RocketmqProducerService.class);
   	
   	/*
   	 * 发送普通消息
   	 * 一级消息
   	 * */
   	public void sendMessage(String topic,Object body) {
   		rt.send(topic, MessageBuilder.withPayload(body).build());
   	}
   	
   	/**
   	 * 发送异步消息 在SendCallback中可处理相关成功失败时的逻辑
   	 */
   	public void sendAsyncMsg(String topic,Object msgBody){
   	    rt.asyncSend(topic,MessageBuilder.withPayload(msgBody).build(), new SendCallback() {
   	        @Override
   	        public void onSuccess(SendResult sendResult) {
   	            // 处理消息发送成功逻辑
   	        }
   	        @Override
   	        public void onException(Throwable e) {
   	            // 处理消息发送异常逻辑
   	        }
   	    });
   	}
   
   	/**
   	 * 发送延时消息<br/>
   	 * 在start版本中 延时消息一共分为18个等级分别为：1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h
   	 */
   	public void sendDelayMsg(String topic,Object msgBody, Integer delayLevel){
   	    rt.syncSend(topic,MessageBuilder.withPayload(msgBody).build(),messagetimeOut,delayLevel);
   	}
   	
   	/**
        * 异步延迟消息
        */
       
       public void asyncSendDelayedStr(String topic,Object body, Integer delayLevel) {
           SendCallback sc=new SendCallback() {
               @Override
               public void onSuccess(SendResult sendResult) {
                   log.info("发送异步延时消息成功");
               }
               @Override
               public void onException(Throwable throwable) {
                   log.info("发送异步延时消息失败:{}",throwable.getMessage());
               }
           };
   
           Message<Object> message= MessageBuilder.withPayload(body).build();
           rt.asyncSend(topic, message, sc, messagetimeOut, delayLevel);
       }
   
   	/**
   	 * 发送带tag的消息,直接在topic后面加上":tag"
   	 */
   	public void sendTagMsg(String topic,String tag, Object msgBody){
   	    rt.syncSend(topic+":"+tag,MessageBuilder.withPayload(msgBody).build());
   	}
   	
   	/**
        * 单向消息
        * 特点为只负责发送消息，不等待服务器回应且没有回调函数触发，即只发送请求不等待应答
        * 此方式发送消息的过程耗时非常短，一般在微秒级别
        * 应用场景：适用于某些耗时非常短，但对可靠性要求并不高的场景，例如日志收集
        */
   
       public void sendOneWayMsg(String topic,String tag,Object msgBody) {
           rt.sendOneWay(topic+":"+tag, msgBody);
       }
       
       /**
        * 顺序消息
        */
       public void SendOrderStr(String topic,String tag,List<MsgContent> msgList) {
       	 //msgList.add(new MsgTest(1, "我是id为1的第1条消息", new Date()));
           //msgList.add(new MsgTest(2, "我是id为2的第1条消息", new Date()));
           //msgList.add(new MsgTest(1, "我是id为1的第2条消息", new Date()));
           //msgList.add(new MsgTest(1, "我是id为1的第3条消息", new Date()));
           //msgList.add(new MsgTest(2, "我是id为2的第2条消息", new Date()));
           //msgList.add(new MsgTest(2, "我是id为2的第3条消息", new Date()));
           //msgList.add(new MsgTest(2, "我是id为2的第4条消息", new Date()));
           //msgList.add(new MsgTest(2, "我是id为2的第5条消息", new Date()));
           //msgList.add(new MsgTest(2, "我是id为2的第6条消息", new Date()));
           //msgList.add(new MsgTest(2, "我是id为2的第7条消息", new Date()));
           //msgList.add(new MsgTest(1, "我是id为1的第4条消息", new Date()));
           //msgList.add(new MsgTest(1, "我是id为1的第5条消息", new Date()));
           //msgList.add(new MsgTest(1, "我是id为1的第6条消息", new Date()));
           //msgList.add(new MsgTest(1, "我是id为1的第7条消息", new Date()));
       	msgList.forEach(t ->{
               //rocketMQTemplate.sendOneWayOrderly("first-topic-str:tag1", t,String.valueOf(t.getId()));  //单向顺序消息
               //rocketMQTemplate.syncSendOrderly("first-topic-str:tag1", t, String.valueOf(t.getId()));  //同步的顺序消息
               rt.asyncSendOrderly(topic+":"+tag, t,String.valueOf(t.getId()), new SendCallback() {//异步的顺序消息
                   @Override
                   public void onSuccess(SendResult sendResult) {
                       log.info("异步消息发送成功:{}", sendResult);
                   }
   
                   @Override
                   public void onException(Throwable throwable) {
                       log.info("异步消息发送失败:{}", throwable.getMessage());
                   }
               });
   
           });
       }
   }
   
   ```

消费者项目：

1. 加入依赖：

   ```
   		<dependency>
   			<groupId>org.apache.rocketmq</groupId>
   			<artifactId>rocketmq-spring-boot-starter</artifactId>
   			<version>2.1.1</version>
   		</dependency>
   		要求rocketmq版本与rocketmq.client版本对应，可以去maven仓库找寻
   ```

2. application.properties配置

   ```
   rocketmq.name-server=127.0.0.1:9876  #nameserver地址
   ```

3. 编写消费类

   ```
   package com.example.demo.consumer;
   
   import org.apache.rocketmq.common.message.MessageExt;
   import org.apache.rocketmq.spring.annotation.RocketMQMessageListener;
   import org.apache.rocketmq.spring.core.RocketMQListener;
   import org.springframework.stereotype.Component;
   
   @Component
   @RocketMQMessageListener(topic="queue_test",selectorExpression = "*",consumerGroup = "rocketmq_test_consumer")
   public class RocketmqMessageConsumerTest implements RocketMQListener<MessageExt> {
   	
   	@Override
   	public void onMessage(MessageExt message) {
   		// TODO Auto-generated method stub
   		System.out.println("接收到的消息是："+new String(message.getBody()));
   	}
   	
   	
   }
   ```

   

## 2 rocketmq-client方式

​		此方式基于rocketmq客户端连接，优点：能够使用原生api进行操作，非常的自由，缺点：配置相对麻烦

1. 加入依赖

   ```
   		<!--注意： 这里的版本,要和部署在服务器上的版本号一致-->
           <dependency>
               <groupId>org.apache.rocketmq</groupId>
               <artifactId>rocketmq-client</artifactId>
               <version>4.3.0</version>
           </dependency>
   ```

2. Jms配置类

   ```
   /**
    * @Description: 安装实际开发这里的信息 都是应该写在配置里，来读取，这里为了方便所以写成常量
    */
   public class JmsConfig {
       /**
        * Name Server 地址，因为是集群部署 所以有多个用 分号 隔开
        */
       public static final String NAME_SERVER = "127.12.15.6:9876;127.12.15.6:9877";
       /**
        * 主题名称 主题一般是服务器设置好 而不能在代码里去新建topic（ 如果没有创建好，生产者往该主题发送消息 会报找不到topic错误）
        */
       public static final String TOPIC = "topic_family";
   
   }
   ```

3. produce生产者

   ```
   @Component
   public class Producer {
       private String producerGroup = "test_producer";
       private DefaultMQProducer producer;
       
       public Producer(){
           //示例生产者
           producer = new DefaultMQProducer(producerGroup);
           //不开启vip通道 开通口端口会减2
           producer.setVipChannelEnabled(false);
           //绑定name server
           producer.setNamesrvAddr(JmsConfig.NAME_SERVER);
           start();
       }
       /**
        * 对象在使用之前必须要调用一次，只能初始化一次
        */
       public void start(){
           try {
               this.producer.start();
           } catch (MQClientException e) {
               e.printStackTrace();
           }
       }
     
       public DefaultMQProducer getProducer(){
           return this.producer;
       }
       /**
        * 一般在应用上下文，使用上下文监听器，进行关闭
        */
       public void shutdown(){
           this.producer.shutdown();
       }
   }
   ```

4. consumer消费者

   ```
   @Component
   public class Consumer {
   
       /**
        * 消费者实体对象
        */
       private DefaultMQPushConsumer consumer;
       /**
        * 消费者组
        */
       public static final String CONSUMER_GROUP = "test_consumer";
       /**
        * 通过构造函数 实例化对象
        */
       public Consumer() throws MQClientException {
   
           consumer = new DefaultMQPushConsumer(CONSUMER_GROUP);
           consumer.setNamesrvAddr(JmsConfig.NAME_SERVER);
           //消费模式:一个新的订阅组第一次启动从队列的最后位置开始消费 后续再启动接着上次消费的进度开始消费
           consumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_LAST_OFFSET);
           //订阅主题和 标签（ * 代表所有标签)下信息
           consumer.subscribe(JmsConfig.TOPIC, "*");
           // //注册消费的监听 并在此监听中消费信息，并返回消费的状态信息
           consumer.registerMessageListener((MessageListenerConcurrently) (msgs, context) -> {
               // msgs中只收集同一个topic，同一个tag，并且key相同的message
               // 会把不同的消息分别放置到不同的队列中
               try {
                   for (Message msg : msgs) {
   
                       //消费者获取消息 这里只输出 不做后面逻辑处理
                       String body = new String(msg.getBody(), "utf-8");
                       log.info("Consumer-获取消息-主题topic为={}, 消费消息为={}", msg.getTopic(), body);
                   }
               } catch (UnsupportedEncodingException e) {
                   e.printStackTrace();
                   return ConsumeConcurrentlyStatus.RECONSUME_LATER;
               }
               return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
           });
   
           consumer.start();
           System.out.println("消费者 启动成功=======");
       }
   }
   ```

5. 测试

   ```
   @RestController
   public class Controller {
   
       @Autowired
       private Producer producer;
   
       private List<String> mesList;
   
       /**
        * 初始化消息
        */
       public Controller() {
           mesList = new ArrayList<>();
           mesList.add("小小");
           mesList.add("爸爸");
           mesList.add("妈妈");
           mesList.add("爷爷");
           mesList.add("奶奶");
   
       }
   
       @RequestMapping("/text/rocketmq")
       public Object callback() throws Exception {
           //总共发送五次消息
           for (String s : mesList) {
               //创建生产信息
               Message message = new Message(JmsConfig.TOPIC, "testtag", ("小小一家人的称谓:" + s).getBytes());
               //发送
               SendResult sendResult = producer.getProducer().send(message);
               log.info("输出生产者信息={}",sendResult);
           }
           return "成功";
       } 
   }
   ```

   

