# 项目优化： 2020-5-26 更新 [**进度安排**](https://github.com/BEATING-HEART/Canteen_Online/wiki/%E8%BF%9B%E5%BA%A6%E5%AE%89%E6%8E%92)

## 进入点餐页面（Tab-order页面）

- 载入时：【云函数】获取用户信息。存在本地缓存，留待使用 [**用户数据表的构建**](https://github.com/BEATING-HEART/Canteen_Online/wiki/%E7%94%A8%E6%88%B7%E6%95%B0%E6%8D%AE%E8%A1%A8%E6%9E%84%E5%BB%BA)

   1. 读取寝室信息失败，那么跳转到信息认证页面。
   2. 读取寝室信息成功，按照寝室信息，就近读取食堂，显示于搜索框左侧，项目初期暂不开放选择食堂的功能。
 
- 【云函数】根据食堂信息读取菜品，显示在屏幕上。[**食堂窗口信息表的构建**](https://github.com/BEATING-HEART/Canteen_Online/wiki/%E9%A3%9F%E5%A0%82%E7%AA%97%E5%8F%A3%E4%BF%A1%E6%81%AF%E8%A1%A8%E7%9A%84%E6%9E%84%E5%BB%BA)
- 点击菜品进入菜品详情页面。
- 点击导航栏，进入其他页面

## 菜品详情页（OrderConfirm页面）

- 显示菜品的详细信息。
- 编辑表单

   1. 选择取餐时间（*取餐时间选择弹窗改为贴着下面放*）
   2. 只提供固定的几个批次的取餐时间。
   3. 地址改为直接读取寝室信息
   
- 【云函数】点击下单按钮可以产生订单，提交表单。 [**订单数据表的构建**](https://github.com/BEATING-HEART/Canteen_Online/wiki/%E8%AE%A2%E5%8D%95%E6%95%B0%E6%8D%AE%E8%A1%A8%E7%9A%84%E6%9E%84%E5%BB%BA)
- 弹出确认订单弹窗，提交到数据库（*显示菜品，地址，时间，价格，弹窗布局调整一下*）

## 订单页面（tab-orders页面）

- 【云函数】根据个人信息从订单表中查找订单。新订单在上。

## 我的页面（tab-my页面）

- 显示个人信息。
- 点击头像昵称栏，进入个人信息修改维护页面。

   1. 【云函数】信息维护修改页面分为两部分：个人信息和用户认证信息
   2. 个人信息可以直接更改，即刻生效
   3. 用户认证信息只能申请修改。

## 食谱管理界面（admin-recipe页面）和菜单增改界面（recipe-modify界面）

- 【云函数】按照食堂信息，显示本食堂的菜品
- 底部按钮，点击增加菜品。
- 菜单项左滑，点击有删除按钮。（删除功能还需完善）
- 点击菜单项，进入菜品修改页面。
- 菜品卡片右上角显示售卖状态。（正在售卖/停止售卖，并做颜色区分）

**菜单修改页面和菜品添加页面还需完善**
   1. 菜单修改页面按钮显示确认修改
   2. 菜品添加页面按钮显示确认添加
   


   
