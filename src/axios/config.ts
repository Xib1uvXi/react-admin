/**
 * Created by 叶子 on 2017/7/30.
 * 接口地址配置文件
 */

//easy-mock模拟数据接口地址
const EASY_MOCK = 'https://www.easy-mock.com/mock';
const MOCK_AUTH = EASY_MOCK + '/597b5ed9a1d30433d8411456/auth'; // 权限接口地址
export const MOCK_AUTH_ADMIN = MOCK_AUTH + '/admin'; // 管理员权限接口
export const MOCK_AUTH_VISITOR = MOCK_AUTH + '/visitor'; // 访问权限接口

// github授权
export const GIT_OAUTH = 'https://github.com/login/oauth';
// github用户
export const GIT_USER = 'https://api.github.com/user';

// bbc top news
export const NEWS_BBC =
    'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=429904aa01f54a39a278a406acf50070';


// auth
export const AUTH = 
    '/api/v1/auth'

// strategies
export const STRATEGIES =
    '/api/v1/strategies';

// create strategy
export const CREATE_STRATEGY =
    '/api/v1/strategy';

// customers
export const CUSTOMERS = '/api/v1/customers'

// create customer
export const CREATE_CUSTOMER = '/api/v1/customer'

// create order
export const CREATE_ORDER = '/api/v1/order'

// cusomter order
export const CUSTOMER_ORDERS =
    '/api/v1/order';

// strategy config
export const STRATEGY_CONFIG = '/api/v1/strategy/config'

// running
export const RUNNING = '/api/v1/running'

// win
export const WIN = '/api/v1/win'

// report
export const REPORT = '/api/v1/report'