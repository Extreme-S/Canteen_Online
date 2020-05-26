# 2020-5-26 更新

## 进入点餐页面（Tab-order页面）

- 载入时：获取用户信息。存在本地缓存，留待使用 [**学生数据表的构建**]()

   1. 读取寝室信息失败，那么跳转到信息认证页面。
   2. 读取寝室信息成功，按照寝室信息，就近读取食堂，显示于搜索框左侧，项目初期暂不开放选择食堂的功能。
 
- 根据食堂信息读取菜品，显示在屏幕上。[**食堂窗口信息表的构建**]()
- 点击菜品进入菜品详情页面。
- 点击导航栏，进入其他页面

## 菜品详情页（OrderConfirm页面）

- 显示菜品的详细信息。
- 编辑表单

   1. 选择取餐时间（*取餐时间选择弹窗改为贴着下面放*）
   2. 只提供固定的几个批次的取餐时间。
   3. 地址改为直接读取寝室信息
   
- 点击下单按钮可以产生订单，提交表单。 [**订单数据表的构建**]()
- 弹出确认订单弹窗，提交到数据库（*显示菜品，地址，时间，价格，弹窗布局调整一下*）

## 订单页面（tab-orders页面）

- 根据个人信息从订单表中查找订单。新订单在上。

## 我的页面（tab-my页面）

- 根据显示个人信息。
- 点击头像昵称栏，进入个人信息修改维护页面。

   1. 信息维护修改页面分为两部分：个人信息和用户认证信息
   2. 个人信息可以直接更改，即刻生效
   3. 用户认证信息只能申请修改。

## 食谱管理界面（admin-recipe页面）和菜单增改界面（recipe-modify界面）

- 按照食堂信息，显示本食堂的菜品
- 底部按钮，点击增加菜品。
- 菜单项左滑，点击有删除按钮。（删除功能还需完善）
- 点击菜单项，进入菜品修改页面。
- 菜品卡片右上角显示售卖状态。（正在售卖/停止售卖，并做颜色区分）
**菜单修改页面和菜品添加页面还需完善**
   1. 菜单修改页面按钮显示确认修改
   2. 菜品添加页面按钮显示确认添加


   
