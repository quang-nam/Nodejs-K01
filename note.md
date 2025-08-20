API Specification:

- STT
- Task code
- Module
- Endpoint
- Method
- Mô tả
- Headers
- Request Body

- đổi dạng `"type":"module"`
- nodemon: node monitoring, cập nhật tự động khi có thay đổi
- cài đặt nodemon: `npm install nodemon --save-dev`
- sửa package.json:

```json
{
  "scripts": {
    "dev": "nodemon index.js"
  }
}
```

### http status code: bộ mã lỗi trạng thái http

- http: không mã hóa, dễ bị tấn công, hoạt động trên cổng 80, truyền dưới dạng văn bản, không mã hóa, nên không an toàn, chứa điều lệ để làm việc trên trình duyệt
- https: mã hóa, an toàn hơn, thường thấy ở các trang web có biểu tượng ổ khóa, hoạt động trên cổng 443, đảm bảo tính riêng tư, trọn vẹn riêng tư, toàn vẹn dữ liệu
- request: req.url, req.method, req.headers
- response: res.statusCode, res.statusMessage, res.headers, res.body

```js
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (req.url === "/students") {
    res.end(JSON.stringify(student));
  }
  if (req.url === "/products") {
    const products = [
      { id: 1, name: "Laptop", price: 200 },
      { id: 2, name: "Phone", price: 500 },
      { id: 3, name: "Tablet", price: 300 },
    ];
    res.end(JSON.stringify(products));
  }
});
```

- neu viet nhu kia thi co 100 api thi if else 100 lan => ko duoc
- express: giai quyet van de tren, cung cap cac phuong thuc de tao api nhanh hon, cung cap cac phuong thuc de tao phuong thuc nhanh hon.
- app.use: su dung middleware, middleware la cac ham xu ly truoc khi xu ly request
- app.use(express.json()): su dung middleware de xu ly request body, chuyen doi request body tu json sang object
- tại sao nodejs lại có middleware:

* data: {
  "name": "John",
  "age": 30}
  khi gửi băm ra thành từng phần nhỏ, trong s đầu gửi name đi s sau gửi age đi, sau đó đánh số id ghép lại thành chuỗi hoàn chỉnh, khi gửi đi hết rồi, parse ngược trở lại thành object

- chunk: phần nhỏ của dữ liệu, khi gửi dữ liệu lớn, nó sẽ được chia thành các phần nhỏ để gửi đi, sau đó ghép lại thành dữ liệu hoàn chỉnh, băm ra khi gửi đi

```js
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json()); // middleware để parse request body
app.get("/students", (req, res) => {
  res.status(200).json(student);
});
app.get("/products", (req, res) => {
  const products = [
    { id: 1, name: "Laptop", price: 200 },
    { id: 2, name: "Phone", price: 500 },
    { id: 3, name: "Tablet", price: 300 },
  ];
  res.status(200).json(products);
});
app.post("/students", (req, res) => {
  const newStudent = req.body; // lấy dữ liệu từ request body
  // thêm sinh viên mới vào cơ sở dữ liệu (giả sử)
  res.status(201).json({ message: "Student created", student: newStudent });
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

- api: đóng vai trò như người phục vụ, nhận yêu cầu từ khách hàng, xử lý yêu cầu và trả về kết quả
- orm: Object-Relational Mapping, là một kỹ thuật lập trình cho phép ánh xạ các đối tượng trong mã nguồn với các bảng trong cơ sở dữ liệu, giúp dễ dàng thao tác với cơ sở dữ liệu mà không cần viết câu lệnh SQL trực tiếp.
- api: giao diện lập trình ứng dụng, là một tập hợp các quy tắc và giao thức cho phép các phần mềm khác nhau giao tiếp với nhau, thường được sử dụng để truy cập dữ liệu hoặc chức năng của một ứng dụng hoặc dịch vụ.
- file env:

* .env.development
* .env.development.local
* .env.production

| Dạng dùng `app.use()`          | Mục đích                              |
| ------------------------------ | ------------------------------------- |
| `app.use(middleware)`          | Middleware cho mọi route              |
| `app.use('/path', middleware)` | Middleware riêng cho đường dẫn cụ thể |
| `app.use(errorHandler)`        | Middleware xử lý lỗi                  |
| `app.use((req, res) => ...)`   | Bắt lỗi 404                           |

- thuc te routes co the co nhieu version: v1-version 1, v2- version 2 (du an to)
