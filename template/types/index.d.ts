// ------------------------------------------------------------------------------
// name: index.d
// author: 喵大斯( mschool.tech )
// created: 2019/8/22
// ------------------------------------------------------------------------------

import Vue, { ComponentOptions } from 'vue';

import { Message, MessageBox, Notification } from 'element-ui';
import { EnvHolderType } from '@mudas/env';
import { ActionError, ServiceError, ActionConf, State } from '@mudas/storage/types/error';
import { ProjectConfig } from './config';

export declare interface StorageActionError extends ActionError {}

export declare interface StorageServiceError extends ServiceError {}

export declare interface StorageActionConf extends ActionConf {}

export declare interface StorageState extends State {}

declare module 'vue/types/vue' {
  // Vue.xxx 静态成员
  interface VueConstructor {
    conf: ProjectConfig;
    env: EnvType;

    msgbox: typeof MessageBox;
    alert: typeof MessageBox.alert;
    confirm: typeof MessageBox.confirm;
    prompt: typeof MessageBox.prompt;
    notify: typeof Notification;
    message: typeof Message;
  }

  // this.$xxx 实例成员
  interface Vue {
    $conf: ProjectConfig;
    $env: EnvType;

    $msgbox: typeof MessageBox;
    $alert: typeof MessageBox.alert;
    $confirm: typeof MessageBox.confirm;
    $prompt: typeof MessageBox.prompt;
    $notify: typeof Notification;
    $message: typeof Message;
  }
}

declare interface EnvType extends EnvHolderType {
  alipayApplet?: boolean;
  wechatApplet?: boolean;
}

// 扩展 vue 构造参数
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    handler?: Handlers;
  }
}

declare function handlerType(options?: { type: string, detail: any }): void;

declare interface Handlers {
  [index: string]: typeof handlerType;
}
