# 📝 Hệ Thống Quản Lý Thi Trắc Nghiệm

Hệ thống hỗ trợ tổ chức và quản lý thi trắc nghiệm trực tuyến, phù hợp cho môi trường giáo dục đại học, cao đẳng, trung học chuyên nghiệp.

---

## 🚀 Tính Năng Chính

### 1. Giao diện người dùng
- Landing Page giới thiệu hệ thống.

### 2. Xác thực & Phân quyền
- Đăng nhập / Đăng xuất với cơ chế lưu **Token (JWT)**.
- Đăng nhập bằng **Google** (nếu đã liên kết tài khoản).
- Quên mật khẩu: gửi mã **OTP qua email** (nếu đã liên kết Google).
- Phân quyền động với hệ thống **nhóm quyền linh hoạt**.

### 3. Quản lý người dùng
- Sinh viên cập nhật hồ sơ cá nhân.
- Thêm, xóa, chỉnh sửa **người dùng**, **nhóm quyền**, **thông báo**.
- Import danh sách sinh viên vào hệ thống (file Excel).
- Sinh viên tham gia nhóm học phần bằng **mã mời**.

### 4. Quản lý học phần & nội dung thi
- Quản lý **môn học**, **chương**, **câu hỏi**, **đề thi**, **nhóm học phần**.
- **Phân công giảng dạy**: Giảng viên chỉ được thao tác trong phạm vi môn học được phân công.
- Hỗ trợ tìm kiếm, phân trang sử dụng **AJAX**.

### 5. Nhập dữ liệu từ tệp
- Đọc và import **câu hỏi từ file Excel**.
- Import **danh sách sinh viên** từ file Excel.

### 6. Tạo và cấu hình đề thi
- **Đề thi thủ công**: Giảng viên tự chọn từng câu hỏi, cho phép:
  - Đảo câu hỏi.
  - Đảo đáp án.
- **Đề thi tự động**: Giảng viên nhập số lượng câu hỏi theo mức độ và chương, hệ thống tự sinh đề riêng cho từng sinh viên.
- Thiết lập **thời gian bắt đầu/kết thúc** cho đề thi.

### 7. Quản lý quá trình làm bài
- Phát hiện và ghi nhận số lần **chuyển tab** khi sinh viên làm bài.
- **Tự động nộp bài** nếu sinh viên rời tab vượt ngưỡng cho phép.
- **Tự động lưu đáp án** khi tắt trình duyệt bất ngờ.
- Cho phép sinh viên **xem lại bài thi** (nếu cấu hình đề thi cho phép).

### 8. Báo cáo & thống kê
- **In kết quả** bài làm:
  - Theo sinh viên.
  - Toàn bộ nhóm học phần.
- **Xuất báo cáo tổng hợp** kết quả tất cả các bài kiểm tra.
- **Thống kê điểm số**, phân loại:
  - Đã tham gia thi.
  - Chưa thi.
  - Đã hoàn thành bài.
- **Sắp xếp sinh viên** theo tên hoặc điểm số.

---

## 📌 Lưu ý

- File Excel để import câu hỏi cần đúng **mẫu định dạng**. File mẫu nằm tại thư mục `...`.
- Khi cấu hình đề thi cho phép, sinh viên có thể **xem lại bài làm** sau khi nộp bài.
