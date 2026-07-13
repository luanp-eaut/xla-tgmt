<div class="guideline">

## Hướng dẫn xây dựng báo cáo bài tập lớn

Báo cáo cần được trình bày theo đúng mẫu quy định. Dưới đây là gợi ý chi tiết cho từng phần.

### Trang bìa và mục lục

- **Bìa chính:** Theo mẫu bìa [tại đây](template.md).
- **Mục lục:** Liệt kê đầy đủ các chương, mục và số trang.

### Chương 1. Mở đầu (Giới thiệu đề tài)

**1.1. Mục tiêu của hệ thống:**

- Nêu rõ hệ thống hướng tới giải quyết vấn đề gì?
- Mục tiêu chính của việc xây dựng CSDL này là gì? (Ví dụ: Quản lý thông tin khách hàng, sản phẩm, đơn hàng cho cửa hàng tiện lợi một cách hiệu quả và chính xác).
- Lợi ích mà hệ thống mang lại (Ví dụ: Giúp việc tra cứu, thống kê, báo cáo nhanh chóng, hạn chế sai sót...).

**1.2. Phạm vi bài toán và đối tượng sử dụng:**

- **Phạm vi:** Xác định rõ hệ thống chỉ tập trung vào những tác vụ, phân hệ nào (ví dụ: không bao gồm quản lý nhân sự của công ty, chỉ tập trung vào quản lý bán hàng và kho).
- **Đối tượng sử dụng:** Ai sẽ là người dùng của hệ thống? (Ví dụ: Quản trị viên, Nhân viên bán hàng, Nhân viên kho, Khách hàng...).

### Chương 2. Phân tích yêu cầu

**2.1. Danh sách các use case chính:**

- Liệt kê tất cả các chức năng (use case) mà hệ thống cần có.
- Với mỗi use case, cần cung cấp:
  - **Tên use case:** (Ví dụ: Đăng nhập, Quản lý sản phẩm, Tạo đơn hàng, ...)
  - **Tác nhân (Actor):** Ai thực hiện? (Nhân viên bán hàng, Quản trị viên...).
  - **Mô tả ngắn gọn:** Chức năng và nghiệp vụ xử lý của use case đó. (Ví dụ: Use case "Tạo đơn hàng": Cho phép nhân viên bán hàng tạo mới một đơn hàng, bao gồm việc thêm các sản phẩm và tính tổng tiền).

**2.2. Sơ đồ use case:**

- Vẽ sơ đồ use case tổng quát để thể hiện các mối quan hệ giữa tác nhân và các use case.

### Chương 3. Thiết kế cơ sở dữ liệu quan hệ

**3.1. Xác định thực thể, thuộc tính, quan hệ:**

- **Thực thể:** Liệt kê các đối tượng chính (Ví dụ: KHACH_HANG, DON_HANG, CHI_TIET_DON_HANG, SAN_PHAM, NHAN_VIEN...).
- **Thuộc tính:** Với mỗi thực thể, liệt kê các thuộc tính kèm theo kiểu dữ liệu và ý nghĩa. **Đặc biệt nhấn mạnh khóa chính (Primary Key - PK).**
- **Mối quan hệ:** Mô tả mối quan hệ giữa các thực thể (1-1, 1-N, N-N) và **xác định khóa ngoại (Foreign Key - FK)** để thể hiện mối quan hệ này.

**3.2. Sơ đồ ERD (Logic hoặc Vật lý):**

- Trình bày sơ đồ ERD.
- Sơ đồ cần thể hiện rõ các bảng, các thuộc tính, PK, FK.

**3.3. Chuẩn hóa CSDL:**

- **Quan trọng:** Trình bày ngắn gọn quá trình chuẩn hóa để đảm bảo CSDL của bạn đạt chuẩn 3NF (ít nhất).
- Giải thích tại sao các bảng được thiết kế như vậy là đã đạt chuẩn 3NF, hoặc nếu có các bảng cố tình vi phạm (do yêu cầu hiệu năng) thì cần giải thích rõ lý do.

### Chương 4. Xây dựng các khối lệnh PL/SQL

**4.1. Stored procedures:**

- Xây dựng các procedure thực hiện các thao tác cập nhật dữ liệu phức tạp.
- **Ví dụ:** `SP_TaoDonHang` (tạo đơn hàng và chi tiết đơn hàng), `SP_CapNhatTonKho` (cập nhật số lượng tồn khi nhập/xuất hàng).
- Trình bày **code** và **giải thích rõ chức năng**, các tham số đầu vào/đầu ra.

**4.2. Functions:**

- Xây dựng các function trả về một giá trị duy nhất (Ví dụ: Hàm `F_TinhTongTienDonHang(p_DonHangID)`, `F_GetTenKhachHang(p_KhachHangID)`).
- Trình bày **code** và **giải thích** cách sử dụng.

**4.3. Packages:**

- **Bắt buộc** có ít nhất 01 package để nhóm các procedure và function liên quan lại với nhau (Ví dụ: Package `QuanLyDonHang` chứa `SP_TaoDonHang` và `F_TinhTongTienDonHang`).
- Trình bày code của phần Specification và Body. Giải thích lợi ích của việc sử dụng package.

**4.4. Triggers:**

- **Bắt buộc** có ít nhất 01 trigger để:
  - Đảm bảo ràng buộc dữ liệu (Ví dụ: Tự động kiểm tra số lượng tồn kho trước khi thêm chi tiết đơn hàng).
  - Ghi nhận lịch sử (Ví dụ: Trigger ghi lại bảng Log mỗi khi có thay đổi về giá sản phẩm).
- Trình bày **code** và **giải thích rõ** sự kiện kích hoạt, bảng được tác động và mục đích của trigger.

**4.5. Xử lý ngoại lệ (Exception Handling) và giao dịch (Transaction):**

- **Bắt buộc** tất cả các khối PL/SQL đều phải có phần **Exception** để bắt và xử lý lỗi.
- Sử dụng **COMMIT** và **ROLLBACK** một cách hợp lý. Ví dụ: Trong `SP_TaoDonHang`, nếu lỗi xảy ra ở bất kỳ bước nào, toàn bộ quá trình sẽ bị Rollback để đảm bảo tính toàn vẹn dữ liệu.

**4.6. Minh họa xử lý lỗi nghiệp vụ:**

- Đưa ra ít nhất 01 tình huống xử lý lỗi nghiệp vụ. **Mô tả tình huống đó và cách PL/SQL của bạn xử lý nó**.
- _Ví dụ:_ Khi cố gắng tạo đơn hàng với số lượng sản phẩm vượt quá số tồn kho. Procedure sẽ bắt lỗi ngoại lệ và rollback giao dịch, báo về cho người dùng.

### Chương 5. Triển khai cơ sở dữ liệu trong Oracle

**5.1. Tạo schema/user và PDB:**

- Mô tả quá trình tạo user/schema cho nhóm trong Oracle.

**5.2. Xây dựng các đối tượng CSDL:**

- **Tables:** Trình bày các câu lệnh `CREATE TABLE` đầy đủ với các ràng buộc (PK, FK, CHECK, NOT NULL, UNIQUE).
- **Indexes:** Giải thích lý do chọn các cột để tạo Index nhằm tăng hiệu suất truy vấn. Cung cấp câu lệnh `CREATE INDEX`.
- **Sequences:** Tạo các Sequence để tự động sinh giá trị cho khóa chính. Ví dụ: `SEQ_MAKH` cho bảng `KHACH_HANG`.
- **Views:** Xây dựng các View để đơn giản hóa các truy vấn phức tạp hoặc để phân quyền. Ví dụ: `V_THONGKE_DOANHTHU`, `V_DANH_SACH_DON_HANG`.

**5.3. Xây dựng dữ liệu mẫu:**

- Sử dụng các câu lệnh `INSERT INTO` để tạo dữ liệu giả định (data mẫu) cho các bảng. Dữ liệu cần đa dạng, phong phú để có thể kiểm thử toàn diện hệ thống.

### Chương 6. Phân quyền và bảo mật CSDL

**6.1. Thiết kế roles và gán quyền:**

- Tạo ít nhất 02 role nghiệp vụ.
- _Ví dụ:_ `ROLE_QUAN_TRI` (có mọi quyền), `ROLE_NHAN_VIEN` (chỉ có quyền SELECT, INSERT, UPDATE trên các bảng nghiệp vụ).
- Sử dụng câu lệnh `GRANT` và `REVOKE` để gán quyền cho các role.
- **Trình bày các câu lệnh này** và giải thích ý nghĩa của từng quyền.

**6.2. Tạo user và phân quyền:**

- Tạo ít nhất 02 user kiểm thử.
- _Ví dụ:_ `USER_QUAN_TRI` và `USER_NHAN_VIEN`.
- Gán các role vừa tạo cho các user này.

**6.3. Kiểm tra quyền truy cập:**

- Đăng nhập vào từng user và thực hiện các thao tác (SELECT, INSERT, DELETE) để chứng minh sự khác biệt về quyền hạn.
- Đưa ra kết quả minh họa (Ví dụ: User nhân viên khi thực hiện `DELETE` trên bảng `NHAN_VIEN` sẽ bị lỗi `insufficient privileges`).

### Chương 7. Kiểm thử

**7.1. Các kịch bản kiểm thử:**

- Xây dựng ít nhất 10 kịch bản kiểm thử. Mỗi kịch bản cần có:
  1. **Mã kịch bản:** (Ví dụ: TC01).
  2. **Mô tả kịch bản:** Mục đích kiểm tra? (Ví dụ: Kiểm tra chức năng thêm mới 1 khách hàng hợp lệ).
  3. **Các bước thực hiện:** (Ví dụ: Gọi `SP_ThemKhachHang` với các tham số X, Y, Z).
  4. **Kết quả mong đợi:** (Ví dụ: Bảng `KHACH_HANG` có thêm 1 bản ghi mới).
  5. **Kết quả thực tế:** Chụp ảnh màn hình kết quả thực thi trên Oracle.
- Cần có các kịch bản kiểm thử cho cả **trường hợp hợp lệ** và **không hợp lệ** (Ví dụ: Thêm khách hàng thiếu tên, xóa sản phẩm đang được tham chiếu trong đơn hàng, số lượng đặt hàng vượt tồn kho...).

### Chương 8. Kết luận

**8.1. Kết quả đạt được và khó khăn:**

- Tóm tắt những gì nhóm đã làm được, những mục tiêu đã đạt.
- Nêu ra những khó khăn, vướng mắc trong quá trình thực hiện (Ví dụ: Xác định ràng buộc dữ liệu phức tạp, lập trình PL/SQL, xử lý lỗi...).

**8.2. Bài học kinh nghiệm:**

- **Kinh nghiệm trong thiết kế mô hình CSDL:** Học được tầm quan trọng của việc nắm rõ nghiệp vụ, chuẩn hóa dữ liệu và xác định đúng PK, FK.
- **Kinh nghiệm trong triển khai, phân quyền và quản trị CSDL Oracle:** Học được cách tạo user, phân quyền bằng role, bảo mật dữ liệu.
- **Kinh nghiệm trong viết và tổ chức mã PL/SQL:** Rút ra được các kỹ năng sử dụng Procedure, Function, Trigger, Package và cách xử lý giao dịch, ngoại lệ để hệ thống an toàn và bền vững.

### Phụ lục và tài liệu tham khảo

**Phụ lục:**

- Bảng phân công công việc của các thành viên.
- Toàn bộ các Script (code) đã xây dựng (CREATE, INSERT, PL/SQL, GRANT...).

**Tài liệu tham khảo:**

- Liệt kê các tài liệu, giáo trình, website, công cụ đã sử dụng để tham khảo (ví dụ: tài liệu môn học, tài liệu Oracle, Stack Overflow...).

</div>
