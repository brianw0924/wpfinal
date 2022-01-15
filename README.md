# wpfinal
## Install
* Clone
    ```
    git clone -b heroku --single-branch git@github.com:brianw0924/wpfinal.git
    ```
* Setup
    ```
    cd wpfinal
    yarn install
    yarn build
    ```
    * Prepare your .env in wpfinal/
        ```
        MONGO_URL=$YOUR_MONGO_URL
        ```
* Start
    ```
    yarn start
    ```
* Use
    Go to http://localhost:80

## 功能
* 註冊使用者帳號與密碼
    * 系統防止重複註冊
    * bcrypt加密
* 登入/登出
    * 不能被by pass
    * 有登入會記錄，不會因重整而要重新登入
* 發布貼文
    * 避免不合法的格式
* 瀏覽貼文
    * 所有貼文、預定的貼文、自己發的文
* 貼文詳情
    * 發布者
    * 發布內容
    * 領取地點
    * 發布時間
    * 食物數量
* 刪除貼文
    * 刪除自己的貼文
* 領取食物
    * 在貼文詳情可以按按鈕領取
* 完成領取
    * 領完後按按鈕確認已領取
* 使用者資訊
    * 使用者名稱
    * 已領取數量
    * 已贈送數量
* 貼文標籤
    * 食物
    * 飲料

## 分工
* 葉沛鎧：全端、資料庫系統
* 王韋翰：全端、雲端部署
* 丁維：全端、UI/UX