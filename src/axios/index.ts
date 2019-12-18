/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import { get, post } from './tools';
import * as config from './config';

export const getBbcNews = () => get({ url: config.NEWS_BBC });

export const npmDependencies = () =>
    axios
        .get('./npm.json')
        .then(res => res.data)
        .catch(err => console.log(err));

export const weibo = () =>
    axios
        .get('./weibo.json')
        .then(res => res.data)
        .catch(err => console.log(err));

export const gitOauthLogin = () =>
    get({
        url: `${config.GIT_OAUTH}/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin`,
    });
export const gitOauthToken = (code: string) =>
    post({
        url: `https://cors-anywhere.herokuapp.com/${config.GIT_OAUTH}/access_token`,
        data: {
            client_id: '792cdcd244e98dcd2dee',
            client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059',
            redirect_uri: 'http://localhost:3006/',
            state: 'reactAdmin',
            code,
        },
    });
// {headers: {Accept: 'application/json'}}
export const gitOauthInfo = (access_token: string) =>
    get({ url: `${config.GIT_USER}access_token=${access_token}` });

// easy-mock数据交互
// 管理员权限获取
export const admin = () => get({ url: config.AUTH });
// 访问权限获取
export const guest = () => get({ url: config.MOCK_AUTH_VISITOR });


// ----------------------

export const getStrategies = () => get({ url: config.STRATEGIES });
export const getCustomers = () => get({ url: config.CUSTOMERS });

export const getCustomerOrders = (id: any) => get({ url: config.CUSTOMER_ORDERS + '/' + id });

export const createStrategy = (strategyName: string) => post({
    url: config.CREATE_STRATEGY,
    data: {
        name: strategyName,
    },
});

export const createCustomer = (name: string, amount: any) => post({
    url: config.CREATE_CUSTOMER,
    data: {
        name: name,
        raw_amount: amount,
    },
});

export const createOrder = (userID: number, userName: string, strategyID: number, strategyName: string, profit: number) => post({
    url: config.CREATE_ORDER,
    data: {
        user_id: userID,
        user_name: userName,
        strategy_id: strategyID,
        strategy_name: strategyName,
        profit: profit,
    },
});

export const getStrateConfig = () => get({ url: config.STRATEGY_CONFIG })

export const setStrateConfig = (cfg: any, append: boolean) => post({
    url: config.STRATEGY_CONFIG,
    data: {
        configs: cfg,
        append: append,
    },
});

export const running = () => post({
    url: config.RUNNING,
    data: {},
})

export const win = (id: any) => post({
    url: config.WIN,
    data: {
        sid: id,
    },
})

export const report = () => get({ url: config.REPORT })