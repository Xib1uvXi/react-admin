export interface IFMenuBase {
    key: string;
    title: string;
    icon?: string;
    component?: string;
    query?: string;
    auth?: string;
    route?: string;
    /** 是否登录校验，true不进行校验（访客） */
    login?: boolean;
}

export interface IFMenu extends IFMenuBase {
    subs?: IFMenuBase[];
}

const menus: {
    menus: IFMenu[];
    others: IFMenu[] | [];
    [index: string]: any;
} = {
    menus: [
        // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },
        // { key: '/app/strategy_table', title: 'Strategy', icon: 'copy', component: 'StrategyTable' },
        { key: '/app/strategyTable', icon: 'copy', title: '策略', component: 'AsynStrategyTable' },
        { key: '/app/table/customerTable', icon: 'copy',title: '客户', component: 'ConstomerTable' },
    ],
    others: [
        { key: '/app/table/customerOrderTable', title: '客户订单列表', component: 'CustomerOrderTable', query:'?nothing=1' },
    ], // 非菜单相关路由
};

export default menus;
