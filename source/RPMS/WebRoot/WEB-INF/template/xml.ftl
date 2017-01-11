<!--------------------------Hibernate开始------------------------->
		<mapping class="com.lion.${generateInfo.systemName}.${generateInfo.packageName}.model.${generateInfo.className}" />
		<#if haveChildren == "1">
		<#list childrenList as child>
		<mapping class="com.lion.${generateInfo.systemName}.${generateInfo.packageName}.model.${child.className}" />
		</#list>
		</#if>
<!--------------------------Hibernate结束------------------------->
<!--------------------------Spring开始------------------------->
	<!--${generateInfo.classRemark}开始-->
	<#assign beanName=generateInfo.className?uncap_first>
 	<bean id="${beanName}" class="com.lion.${generateInfo.systemName}.${generateInfo.packageName}.model.${generateInfo.className}" scope="prototype"></bean>
	<bean id="${beanName}Dao" class="com.lion.core.dao.hibernate.GenericDaoHibernate">
		<constructor-arg value="com.lion.${generateInfo.systemName}.${generateInfo.packageName}.model.${generateInfo.className}" />
		<property name="sessionFactory" ref="sessionFactory" />
	</bean>
	<bean id="${beanName}Manager" class="com.lion.${generateInfo.systemName}.${generateInfo.packageName}.manager.impl.${generateInfo.className}ManagerImpl">
		<constructor-arg ref="${beanName}Dao" />
	</bean>
	<bean id="${generateInfo.className}Action" class="com.lion.${generateInfo.systemName}.${generateInfo.packageName}.action.${generateInfo.className}Action" scope="prototype">
		<constructor-arg ref="${beanName}" />
		<constructor-arg ref="${beanName}Manager" />
	</bean>
	<!--${generateInfo.classRemark}结束-->
	<#if haveChildren == "1">
	<#list childrenList as child>
	
	<!--${child.classRemark}开始-->
	<#assign paramName = child.className?uncap_first>
 	<bean id="${paramName}" class="com.lion.${generateInfo.systemName}.${generateInfo.packageName}.model.${child.className}" scope="prototype"></bean>
	<bean id="${paramName}Dao" class="com.lion.core.dao.hibernate.GenericDaoHibernate">
		<constructor-arg value="com.lion.${generateInfo.systemName}.${generateInfo.packageName}.model.${child.className}" />
		<property name="sessionFactory" ref="sessionFactory" />
	</bean>
	<bean id="${paramName}Manager" class="com.lion.${generateInfo.systemName}.${generateInfo.packageName}.manager.impl.${child.className}ManagerImpl">
		<constructor-arg ref="${paramName}Dao" />
	</bean>
	<bean id="${child.className}Action" class="com.lion.${generateInfo.systemName}.${generateInfo.packageName}.action.${child.className}Action" scope="prototype">
		<constructor-arg ref="${paramName}" />
		<constructor-arg ref="${paramName}Manager" />
	</bean>
	<!--${child.classRemark}结束-->
	</#list>
	</#if>
<!--------------------------Spring开始------------------------->