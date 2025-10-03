# Java任务调度框架Quartz

一、什么是quartz作业调度？
 Quartz框架是一个全功能、开源的任务调度服务，可以集成几乎任何的java应用程序—从小的单片机系统到大型的电子商务系统。Quartz可以执行上千上万的任务调度。

二、quartz的体系结构。
1.quartz中使用了一下几种设计模式。

Builer模式
Factory模式
组件模式
链式写法
2.三个主要的概念

调度器 ：Quartz框架的核心是调度器。调度器负责管理Quartz应用运行时环境。调度器不是靠自己做所有的工作，而是依赖框架内一些非常重要的部件。Quartz不仅仅是线程和线程池管理。为确保可伸缩性，Quartz采用了基于多线程的架构。启动时，框架初始化一套worker线程，这套线程被调度器用来执行预定的作业。这就是Quartz怎样能并发运行多个作业的原理。Quartz依赖一套松耦合的线程池管理部件来管理线程环境。
任务：这个很简单，就是我们自己编写的业务逻辑，交给quartz帮我们执行 。
触发器：简单的讲就是调度作业，什么时候开始执行，什么时候结束执行。

3.quartz的体系结构
quartz框架至少有三百多个类组成，这里我们重点介绍几个它的核心部分

JobDetail：quartz每次都会直接创建一个JobDetail，同时创建一个Job实例，它不直接接受一个Job的实例，但是它接受一个Job的实现类，通过new instance()的反射方式来实例一个Job，在这里Job是一个接口，我们需要自己编写类去实现这个接口。下面我们会讲到这个接口。

Trigger : 它由SimpleTrigger和CronTrigger组成，SimpleTrigger实现类似Timer的定时调度任务，CronTrigger可以通过cron表达式实现更复杂的调度逻辑·。
Scheduler：调度器，JobDetail和Trigger可以通过Scheduler绑定到一起。

4.quartz重要组成部分

1).Job接口：可以通过实现该就接口来实现我们自己的业务逻辑，该接口只有execute()一个方法，我们可以通过下面的方式来实现Job接口来实现我们自己的业务逻辑

```
public class HelloJob implements Job{

    public void execute(JobExecutionContext context) throws JobExecutionException {
    //编写我们自己的业务逻辑
    }
```

2).JobDetail:
每次都会直接创建一个JobDetail，同时创建一个Job实例，它不直接接受一个Job的实例，但是它接受一个Job的实现类，通过new instance()的反射方式来实例一个Job.可以通过下面的方式将一个Job实现类绑定到JobDetail中

```
JobDetail jobDetail=JobBuilder.newJob(HelloJob.class).
                withIdentity("myJob", "group1")
                .build();
```

3）JobBuiler：
主要是用来创建jobDeatil实例
4）JobStore:
绑定了Job的各种数据
5）trigger：前文讲到它主要用来执行Job实现类的业务逻辑的，我们可以通过下面的代码来创建一个Trigger实例：（这里我们会看到cron表达式，可以先不用，我们后面会介绍）

```
CronTrigger trigger = (CronTrigger) TriggerBuilder
                .newTrigger()
                .withIdentity("myTrigger", "group1")    //创建一个标识符
                .startAt(date)//什么时候开始触发
                //每秒钟触发一次任务
                .withSchedule(CronScheduleBuilder.cronSchedule("* * * * * ? *"))
                .build();
```

6）Scheduler：创建Scheduler有两种方式
通过StdSchedulerFactory来创建

```
SchedulerFactory sfact=new StdSchedulerFactory();
Scheduler scheduler=sfact.getScheduler();
```

通过DirectSchedulerFactory来创建

```
DiredtSchedulerFactory factory=DirectSchedulerFactory.getInstance();
Scheduler scheduler=factory.getScheduler();
```

Scheduler 配置参数一般存储在quartz.properties中，我们可以修改参数来配置相应的参数。通过调用getScheduler（）方法就能创建和初始化调度对象。

Scheduler的主要函数介绍：

Date schedulerJob(JobDetail,Trigger trigger);返回最近触发的一次时间
void standby()暂时挂起
void shutdown()完全关闭，不能重新启动了
shutdown(true)表示等待所有正在执行的job执行完毕之后，再关闭scheduler
shutdown(false)即直接关闭scheduler

在这里我们不得不提一下quartz.properties这个资源文件，在org.quartz这个包下，当我们程序启动的时候，它首先会到我们的根目录下查看是否配置了该资源文件，如果没有就会到该包下读取相应信息，当我们咋实现更复杂的逻辑时，需要自己指定参数的时候，可以自己配置参数来实现。下面我们简单看一下这个资源文件：

```
org.quartz.scheduler.instanceName: DefaultQuartzScheduler
org.quartz.scheduler.rmi.export: false
org.quartz.scheduler.rmi.proxy: false
org.quartz.scheduler.wrapJobExecutionInUserTransaction: false

org.quartz.threadPool.class: org.quartz.simpl.SimpleThreadPool
org.quartz.threadPool.threadCount: 10
org.quartz.threadPool.threadPriority: 5
org.quartz.threadPool.threadsInheritContextClassLoaderOfInitializingThread: true

org.quartz.jobStore.misfireThreshold: 60000

org.quartz.jobStore.class: org.quartz.simpl.RAMJobStore
```

该资源文件主要组成部分：
①调度器属性
②线程池属性
③作业存储设置
④插件设置

调度器属性：
org.quartz.scheduler.instanceName属性用来区分特定的调度器实例，可以按照功能用途来给调度器起名。
org.quartz.scheduler.instanceId属性和前者一样，也允许任何字符串，但这个值必须是在所有调度器实例中是唯一的，尤其是在一个集群当中，作为集群的唯一key，假如你想quartz帮你生成这个值的话，可以设置我Auto

线程池属性：
threadCount设置线程的数量

threadPriority设置线程的优先级

org.quartz.threadPool.class 线程池的实现

作业存储设置：
描述了在调度器实例的声明周期中，job和trigger信息是怎么样存储的

插件配置：
满足特定需求用到的quartz插件的配置

5.监听器
监听器顾名思义，就是对事件进行监听并且加入自己相应的业务逻辑，主要有以下三个监听器分别对Job,Trigger,Scheduler进行监听。

JobListener
TriggerListener
SchedulerListener

三、Cron表达式 

在这里，我们着重讲解一下cron表达式，quartz之所以能够实现更加复杂的业务逻辑，主要在依赖于cron表达式。 
cron表达式编写的顺序一次是”秒 分 时 日 月 周 年”。 
在这里我们可以看两张图片就能了解到cron表达式的基本语法了。

在线Cron生成表达式：[http://cron.qqe2.com/](http://www.pdtools.net/tools/becron.jsp)

```
附：cronExpression配置说明  
  
字段   允许值   允许的特殊字符   
秒    0-59    , - * /   
分    0-59    , - * /   
小时    0-23    , - * /   
日期    1-31    , - * ? / L W C   
月份    1-12 或者 JAN-DEC    , - * /   
星期    1-7 或者 SUN-SAT    , - * ? / L C #   
年（可选）    留空, 1970-2099    , - * /   
  
  
表达式   意义   
"0 0 12 * * ?"    每天中午12点触发   
"0 15 10 ? * *"    每天上午10:15触发   
"0 15 10 * * ?"    每天上午10:15触发   
"0 15 10 * * ? *"    每天上午10:15触发   
"0 15 10 * * ? 2005"    2005年的每天上午10:15触发   
"0 * 14 * * ?"    在每天下午2点到下午2:59期间的每1分钟触发   
"0 0/5 14 * * ?"    在每天下午2点到下午2:55期间的每5分钟触发    
"0 0/5 14,18 * * ?"    在每天下午2点到2:55期间和下午6点到6:55期间的每5分钟触发    
"0 0-5 14 * * ?"    在每天下午2点到下午2:05期间的每1分钟触发   
"0 10,44 14 ? 3 WED"    每年三月的星期三的下午2:10和2:44触发   
"0 15 10 ? * MON-FRI"    周一至周五的上午10:15触发   
"0 15 10 15 * ?"    每月15日上午10:15触发   
"0 15 10 L * ?"    每月最后一日的上午10:15触发   
"0 15 10 ? * 6L"    每月的最后一个星期五上午10:15触发     
"0 15 10 ? * 6L 2002-2005"    2002年至2005年的每月的最后一个星期五上午10:15触发   
"0 15 10 ? * 6#3"    每月的第三个星期五上午10:15触发    
  
特殊字符   意义   
*    表示所有值；   
?    表示未说明的值，即不关心它为何值；   
-    表示一个指定的范围；   
,    表示附加一个可能值；   
/    符号前表示开始时间，符号后表示每次递增的值；   
L("last")    ("last") "L" 用在day-of-month字段意思是 "这个月最后一天"；用在 day-of-week字段, 它简单意思是 "7" or "SAT"。 如果在day-of-week字段里和数字联合使用，它的意思就是 "这个月的最后一个星期几" – 例如： "6L" means "这个月的最后一个星期五". 当我们用“L”时，不指明一个列表值或者范围是很重要的，不然的话，我们会得到一些意想不到的结果。   
W("weekday")    只能用在day-of-month字段。用来描叙最接近指定天的工作日（周一到周五）。例如：在day-of-month字段用“15W”指“最接近这个月第15天的工作日”，即如果这个月第15天是周六，那么触发器将会在这个月第14天即周五触发；如果这个月第15天是周日，那么触发器将会在这个月第16天即周一触发；如果这个月第15天是周二，那么就在触发器这天触发。注意一点：这个用法只会在当前月计算值，不会越过当前月。“W”字符仅能在day-of-month指明一天，不能是一个范围或列表。也可以用“LW”来指定这个月的最后一个工作日。    
#    只能用在day-of-week字段。用来指定这个月的第几个周几。例：在day-of-week字段用"6#3"指这个月第3个周五（6指周五，3指第3个）。如果指定的日期不存在，触发器就不会触发。    
C    指和calendar联系后计算过的值。例：在day-of-month 字段用“5C”指在这个月第5天或之后包括calendar的第一天；在day-of-week字段用“1C”指在这周日或之后包括calendar的第一天  四、quartz框架实战 文件一（执行具体任务class）
```



```
public class QuartzDemo implements Job{  
  
    @Override  
    public void execute(JobExecutionContext arg0) throws JobExecutionException {  
        System.out.println("Quartz执行.......");  
          
    }  
  
}  
```



文件二：

```
public class QuartzManager{  
    private static final SimpleTrigger CronTrigger = null;  
  
    public static void main(String[] args){  
    }  
      
    public void simpleDemo(){  
          //通过SchedulerFactory来获取一个调度器  
        SchedulerFactory schedulerFactory = new StdSchedulerFactory();  
        Scheduler scheduler;  
        try {  
            scheduler = schedulerFactory.getScheduler();  

        //引进作业程序  
        JobDetail jobDetail =   
        new JobDetail("jobDetail-s1", "jobDetailGroup-s1", QuartzDemo.class);  
  
         //new一个触发器  
        SimpleTrigger simpleTrigger =   
        new SimpleTrigger("simpleTrigger", "triggerGroup-s1");  
  
  
        //设置作业启动时间  
  
        long ctime = System.currentTimeMillis();   
        simpleTrigger.setStartTime(new Date(ctime));  
  
  
        //设置作业执行间隔   
        simpleTrigger.setRepeatInterval(1000);  
  
        //设置作业执行次数  
        simpleTrigger.setRepeatCount(10);  
  
        //设置作业执行优先级默认为5  
        //simpleTrigger.setPriority(10);  
  
  
        //作业和触发器设置到调度器中  
        scheduler.scheduleJob(jobDetail, simpleTrigger);  
          
        //启动调度器  
        scheduler.start();  
        } catch (SchedulerException e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
        }  
    }  
      
    public void cronDemo(){  
  
        try    {  
            SchedulerFactory schedFact  =   new  org.quartz.impl.StdSchedulerFactory();  
            Scheduler sched  =  schedFact.getScheduler();  
            sched.start();  
            JobDetail jobDetail  =   new  JobDetail( " Income Report " ,  
                     " Report Generation " , QuartzDemo.class );  
            jobDetail.getJobDataMap().put( " type " ,  " FULL " );  
            CronTrigger trigger  =   new  CronTrigger( " Income Report " ,  
                     " Report Generation " );  
             /**/ /*  每1分钟执行一次  */   
            trigger.setCronExpression( "0 33 16 * * ?" );  
            sched.scheduleJob(jobDetail, trigger);  
        }   catch  (Exception e)   {  
            e.printStackTrace();  
        }   
    }  
      
    public void caledarDemo(){  
         //通过SchedulerFactory来获取一个调度器  
      SchedulerFactory schedulerFactory = new StdSchedulerFactory();  
      Scheduler scheduler;  
        try {  
            scheduler = schedulerFactory.getScheduler();    
      //引进作业程序  
      JobDetail jobDetail =   
      new JobDetail("jobDetail-s1", "jobDetailGroup-s1", QuartzDemo.class);  
       //new一个触发器  
      CronTrigger simpleTrigger =   
        new CronTrigger("trigger", "group", "job", "group", "16 26/1 8-17 * * ?");  
     // new SimpleTrigger("simpleTrigger", "triggerGroup-s1");  
  
  
      //设置作业启动时间  
    //Calendar excelCal = Calendar.getInstance();  
        //excelCal.add(Calendar.DAY_OF_MONTH, 1);  
        ///excelCal.set(Calendar.HOUR_OF_DAY, 16);  
        //excelCal.set(Calendar.SECOND, 0);  
        //excelCal.add(Calendar.MINUTE, 9);  
     // long ctime = System.currentTimeMillis();   
     // simpleTrigger.setStartTime(excelCal.getTime());  
      //设置作业执行间隔   
     // simpleTrigger.setRepeatInterval(1000);  
      //设置作业执行次数  
     // simpleTrigger.setRepeatCount(10);  
      //设置作业执行优先级默认为5  
      //simpleTrigger.setPriority(10);  
          
      //作业和触发器设置到调度器中  
      scheduler.scheduleJob(jobDetail, simpleTrigger);  
        
      //启动调度器  
      scheduler.start();  
        } catch (SchedulerException e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
        } catch (ParseException e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
        }  
          
          
    }  
      
}  
```

需要注意的几点是经常会出现org.quartz.core.ErrorLogger : An error occured instantiating job to be executed.....这种异常，解决办法是

```
1）Job类必须有默认的无参构造方法，当然不覆盖的话类本身就是无参的构造方法  
  
2）Job的scope必须是Public类型的，因为quartz根据反射机制实例化类，如果不是public的，无法对其暴露  
  
3)  Job类不能是内部类，原因同上，所以最好单独建类  
```

注意：Quartz提供管理任务的Java代码：

```
/** 
  * Package Name:nc.xyzq.common.task
  * 
  */  
  
package nc.xyzq.common.task;

import org.quartz.CronTrigger;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerFactory;
import org.quartz.impl.StdSchedulerFactory;
   
//任务管理器
public class QuartzManager {
    private static SchedulerFactory gSchedulerFactory = new StdSchedulerFactory();
    
    private static String JOB_GROUP_NAME = "EXTJWEB_JOBGROUP_NAME";
    private static String TRIGGER_GROUP_NAME = "EXTJWEB_TRIGGERGROUP_NAME";
    
    /**
     * 添加一个定时任务，使用默认的任务组名，触发器名，触发器组名
     * 
     * @param jobName 任务名
     * @param jobClass  任务
     * @param time  时间设置，参考quartz说明文档
     * 
     */
    public static void addJob(String jobName, String jobClass, String time) {
         
         try {
             //System.out.println("addJob>>>1111>>Apache Tomcat v6.0.32 at localhost:"+jobName+" jobClass:"+jobClass+" time:"+time);
            //通过SchedulerFactory来获取一个调度器 
            Scheduler sched = gSchedulerFactory.getScheduler();
            //引进作业程序  
            JobDetail jobDetail = new JobDetail(jobName, JOB_GROUP_NAME, Class
                    .forName(jobClass));// 任务名，任务组，任务执行类
             //new一个触发器  
            CronTrigger trigger = new CronTrigger(jobName, TRIGGER_GROUP_NAME);
            // 触发器时间设定
            trigger.setCronExpression(time);
            sched.scheduleJob(jobDetail, trigger);
            // 启动
            if (!sched.isShutdown()) {
                sched.start();
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
    }
    
    /**
     * 添加一个定时任务
     * 
     * @param jobName 任务名
     * @param jobGroupName 任务组名
     * @param triggerName 触发器名
     * @param triggerGroupName 触发器组名
     * @param jobClass 任务
     * @param time 时间设置，参考quartz说明文档
     */
    public static void addJob(String jobName, String jobGroupName,
            String triggerName, String triggerGroupName, String jobClass,
            String time) {
        try {
            //通过SchedulerFactory来获取一个调度器 
            Scheduler sched = gSchedulerFactory.getScheduler();
            //引进作业程序  
            JobDetail jobDetail = new JobDetail(jobName, jobGroupName, Class
                    .forName(jobClass));// 任务名，任务组，任务执行类
            //触发器
            CronTrigger trigger = new CronTrigger(triggerName, triggerGroupName);
            // 触发器时间设定
            trigger.setCronExpression(time);
            sched.scheduleJob(jobDetail, trigger);
            // 启动
            if (!sched.isShutdown()) {
                sched.start();
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    
    /**
     * 修改一个任务的触发时间(使用默认的任务组名，触发器名，触发器组名)
     * 
     * @param jobName
     * @param time
     */
    public static void modifyJobTime(String jobName, String time) {
        try {
            Scheduler sched = gSchedulerFactory.getScheduler();
            CronTrigger trigger = (CronTrigger) sched.getTrigger(jobName,
                    TRIGGER_GROUP_NAME);
            if (trigger == null) {
                return;
            }
            String oldTime = trigger.getCronExpression();
            if (!oldTime.equalsIgnoreCase(time)) {
                JobDetail jobDetail = sched.getJobDetail(jobName,
                        JOB_GROUP_NAME);
                Class objJobClass = jobDetail.getJobClass();
                String jobClass = objJobClass.getName();
                removeJob(jobName);

                addJob(jobName, jobClass, time);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    
    /**
     * 修改一个任务的触发时间
     * 
     * @param triggerName
     * @param triggerGroupName
     * @param time
     */
    public static void modifyJobTime(String triggerName,
            String triggerGroupName, String time) {
        try {
            Scheduler sched = gSchedulerFactory.getScheduler();
            CronTrigger trigger = (CronTrigger) sched.getTrigger(triggerName,
                    triggerGroupName);
            if (trigger == null) {
                return;
            }
            String oldTime = trigger.getCronExpression();
            if (!oldTime.equalsIgnoreCase(time)) {
                CronTrigger ct = (CronTrigger) trigger;
                // 修改时间
                ct.setCronExpression(time);
                // 重启触发器
                sched.resumeTrigger(triggerName, triggerGroupName);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    
    /**
     * 移除一个任务(使用默认的任务组名，触发器名，触发器组名)
     * 
     * @param jobName
     */
    public static void removeJob(String jobName) {
        try {
            Scheduler sched = gSchedulerFactory.getScheduler();
            // 停止触发器
            sched.pauseTrigger(jobName, TRIGGER_GROUP_NAME);
            // 移除触发器
            sched.unscheduleJob(jobName, TRIGGER_GROUP_NAME);
            // 删除任务
            sched.deleteJob(jobName, JOB_GROUP_NAME);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    
    /**
     * 移除一个任务
     * 
     * @param jobName
     * @param jobGroupName
     * @param triggerName
     * @param triggerGroupName
     */
    public static void removeJob(String jobName, String jobGroupName,
            String triggerName, String triggerGroupName) {
        try {
            Scheduler sched = gSchedulerFactory.getScheduler();
            // 停止触发器
            sched.pauseTrigger(triggerName, triggerGroupName);
            // 移除触发器
            sched.unscheduleJob(triggerName, triggerGroupName);
            // 删除任务
            sched.deleteJob(jobName, jobGroupName);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    
    /**
     * 启动所有定时任务
     */
    public static void startJobs() {
        try {
            Scheduler sched = gSchedulerFactory.getScheduler();
            if (sched.isShutdown()) {
                sched.start();
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    
    /**
     * 关闭所有定时任务
     */
    public static void shutdownJobs() {
        try {
            Scheduler sched = gSchedulerFactory.getScheduler();
            if (!sched.isShutdown()) {
                sched.shutdown();
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    
    /***
     * 停止触发器
     * @param triggerName
     * @param triggerGroupName
     */
    public static void pauseTrigger(){
        try {
            Scheduler sched = gSchedulerFactory.getScheduler();
            sched.pauseTriggerGroup(TRIGGER_GROUP_NAME);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    
    
    
    /***
     * 重启触发器
     * @param triggerName
     * @param triggerGroupName
     * @param time
     */
    public static void resumeTrigger() {
        try {
            Scheduler sched = gSchedulerFactory.getScheduler();
            // 重启触发器
            sched.resumeTriggerGroup(TRIGGER_GROUP_NAME);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

}
```



# springboot整合Quartz

1. 导入依赖：

```
		<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-quartz</artifactId>
        </dependency>
```

2. 编写抽象的工作类，方便后期通过统一的工作类型去ioc进行查找对应的bean

```
public abstract class AbstractTask implements Job {
	private Logger logger= LoggerFactory.getLogger(AbstractTask.class);
	//提供统一的工作内容描述方法
    protected abstract void executeInternal(JobExecutionContext context);

    protected String cronExpression;

    @Override
    public void execute(JobExecutionContext context) {
        try {
            executeInternal(context);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            logger.error("job execute failed!");
        }
    }

	/* 
	 * 定时任务表达式
	 */
    public String getCronExpression() {
        return cronExpression;
    }
}
```

3. 重写job工厂，将其变为一个可以自动注入的工厂

```
@Component
public class AutowiringSpringBeanJobFactory extends SpringBeanJobFactory implements ApplicationContextAware {
    private transient AutowireCapableBeanFactory beanFactory;

    @Override
    protected Object createJobInstance(TriggerFiredBundle bundle) throws Exception {
        final Object jobInstance=  super.createJobInstance(bundle);
        beanFactory.autowireBean(jobInstance);
        return jobInstance;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.beanFactory=  applicationContext.getAutowireCapableBeanFactory();
    }

}
```

4. 编写Quartz的管理者对象，用于开始所有定时任务、添加新的任务、修改已有任务以及删除已有任务

```
@Component
@Scope("singleton")
public class QuartzManager implements ApplicationContextAware {
	
	private Logger logger=LoggerFactory.getLogger(QuartzManager.class);
	
	private static SchedulerFactory schedulerFactory =new StdSchedulerFactory();

    private static final String JOB_DEFAULT_GROUP_NAME= "JOB_DEFAULT_GROUP_NAME";

    private static final String TRIGGER_DEFAULT_GROUP_NAME ="TRIGGER_DEFAULT_GROUP_NAME";


    private ApplicationContext applicationContext;

    private Scheduler scheduler;

    @Autowired
    private AutowiringSpringBeanJobFactory autowiringSpringBeanJobFactory;
    
    public void start() {
        //启动所有任务
        try {
            this.scheduler= schedulerFactory.getScheduler();//声明任务调度器对象
            scheduler.setJobFactory(autowiringSpringBeanJobFactory);//修改其工厂类型
            //启动所有任务,这里通过ioc工厂获取AbstractTask的所有子类
            Map<String, AbstractTask> tasks= applicationContext.getBeansOfType(AbstractTask.class);
            tasks.forEach((k, v) -> {
                String cronExpression= v.getCronExpression();
                if (cronExpression != null) {//只有cron表达式不为null才可加入任务调度器
                    addJob(k, v.getClass().getName(), cronExpression);
                }
            });
        } catch (SchedulerException e) {
            throw new RuntimeException("init Scheduler failed");
        }
    }
    
    /*
     *  增加定时任务
	 */
    public boolean addJob(String jobName, String jobClass, String cronExp) {
        boolean result = false;
        if (!CronExpression.isValidExpression(cronExp)) {
        	logger.error("cron异常");
            return result;
        }
        try {
            JobDetail jobDetail = JobBuilder.newJob().withIdentity(new JobKey(jobName, JOB_DEFAULT_GROUP_NAME))
                    .ofType((Class<Job>) Class.forName(jobClass))
                    .build();
            Trigger trigger =TriggerBuilder.newTrigger()
                    .forJob(jobDetail)
                    .withSchedule(CronScheduleBuilder.cronSchedule(cronExp))
                    .withIdentity(new TriggerKey(jobName, TRIGGER_DEFAULT_GROUP_NAME))
                    .build();
            scheduler.scheduleJob(jobDetail, trigger);
            scheduler.start();
        } catch (Exception e) {
        	logger.error("添加任务失败!!!!");
        }
        return result;
    }
    
    /*
     *  更新定时任务
	 */
    public boolean updateJob(String jobName, String cronExp) {
        boolean result = false;
        if (!CronExpression.isValidExpression(cronExp)) {
        	logger.error("cron异常");
            return result;
        }
        JobKey jobKey = new JobKey(jobName, JOB_DEFAULT_GROUP_NAME);
        TriggerKey triggerKey= new TriggerKey(jobName, TRIGGER_DEFAULT_GROUP_NAME);
        try {
            if (scheduler.checkExists(jobKey)&& scheduler.checkExists(triggerKey)) {
                JobDetail jobDetail= scheduler.getJobDetail(jobKey);
                Trigger newTrigger = TriggerBuilder.newTrigger()
                        .forJob(jobDetail)
                        .withSchedule(CronScheduleBuilder.cronSchedule(cronExp))
                        .withIdentity(new TriggerKey(jobName, TRIGGER_DEFAULT_GROUP_NAME))
                        .build();
                scheduler.rescheduleJob(triggerKey, newTrigger);
                result = true;
            } else {
            	logger.error("更新的任务:"+jobKey.getName()+"不存在！！！");
            }
        } catch (SchedulerException e) {
        	logger.error("更新任务:"+jobKey.getName()+"失败！！！");
        }
        return result;
    }

    /* 
     * 删除定时任务
	 */
    public boolean deleteJob(String jobName) {
        boolean result = false;
        JobKey jobKey = new JobKey(jobName, JOB_DEFAULT_GROUP_NAME);
        try {
            if (scheduler.checkExists(jobKey)) {
                result=  scheduler.deleteJob(jobKey);
            } else {
                logger.error("删除的任务:"+jobKey.getName()+"不存在！！！");
            }
        } catch (SchedulerException e) {
            logger.error("删除任务:"+jobKey.getName()+"失败！！！");
        }
        return result;
    }

	/* 
	 * 接口实现 初始化
	 */
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		 this.applicationContext = applicationContext;
	}

}
```

5. 编写自己的job工作类

```
@Component("testTask")
public class TestTask extends AbstractTask {
	
	@PostConstruct
	public void init() {
		this.cronExpression="0/2 * * * * ? ";
	}
	
	@Override
	protected void executeInternal(JobExecutionContext context) {
		// TODO Auto-generated method stub
		System.out.println("第一个任务开始！！！！");
	}

}
```

6. 编写启动器，在服务开启时就自动开启所有的定时任务

```
@Component //注意不要使用@weblistener
public class ApplicationStartQuartzJobListener implements ApplicationListener<ContextRefreshedEvent> {
	@Autowired
	private QuartzManager quartzManager;
	
	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		// TODO Auto-generated method stub
		 try {
	        	quartzManager.start();
	            System.out.println("任务已经启动..........................");
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	}
	
	@Bean
    public Scheduler scheduler() throws SchedulerException{
        SchedulerFactory schedulerFactoryBean=new StdSchedulerFactory();
        return schedulerFactoryBean.getScheduler(); 
    }

}
```

