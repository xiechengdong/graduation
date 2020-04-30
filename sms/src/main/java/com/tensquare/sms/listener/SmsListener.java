package com.tensquare.sms.listener;

import com.aliyuncs.exceptions.ClientException;
import com.tensquare.sms.utils.SmsUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * 发送手机验证码消息队列监听器
 */
@Component
@RabbitListener(queues = "sms")
public class SmsListener {

    Logger log = LoggerFactory.getLogger(SmsListener.class);

    @Autowired
    SmsUtil smsUtil;

    /**
     * 阿里云短信服务模板code
     */
    @Value("${aliyun.sms.template_code}")
    private String template_code;

    /**
     * 阿里云短信服务签名名称
     */
    @Value("${aliyun.sms.sign_name}")
    private String sign_name;

    /**
     * 发送短信
     */
    @RabbitHandler
    public void sendSms(Map<String,String> message){
        log.info("手机号：{}",message.get("mobile"));
        log.info("验证码：{}",message.get("checkCode"));

        /**
         * 通过阿里云平台发送验证码短信
         */
        try {
            smsUtil.sendSms(message.get("mobile"),template_code,sign_name,"{\"checkcode\":\""+message.get("checkCode")+"\"}");
        } catch (ClientException e) {
            e.printStackTrace();
        }
        log.info("短信发送提示：{}","发送完毕");
    }
}
