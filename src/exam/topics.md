## Đề tài thi kết thúc học phần

---

**I. YÊU CẦU CHUNG**

**1\. Hình thức thực hiện**

- Bài tập lớn được thực hiện theo nhóm, mỗi nhóm tối đa 05 sinh viên.
- Mỗi nhóm phải có bảng phân công công việc, thể hiện rõ nhiệm vụ của từng thành viên.

**2\. Đề tài thực hiện**

- Mỗi nhóm lựa chọn 01 đề tài trong danh sách 50 đề tài đã công bố hoặc đề tài mở.
- Đối với đề tài mở, nhóm phải mô tả ngắn gọn bài toán và được giảng viên chấp thuận trước khi thực hiện.

**3\. Hình thức báo cáo**

- Báo cáo bài tập lớn phải có độ dài tối thiểu 35 trang A4 (không bao gồm trang bìa, các phần Phụ lục và Tài liệu tham khảo), được trình bày đúng theo mẫu báo cáo bài tập lớn đã ban hành, đảm bảo các yêu cầu về bố cục, định dạng, hình thức trình bày và quy chuẩn học thuật.

---

**II. YÊU CẦU NỘI DUNG BÁO CÁO**

Báo cáo bài tập lớn phải thể hiện đầy đủ các nội dung và yêu cầu sau đây:

**1\. Giới thiệu đề tài**

- Mô tả mục tiêu của hệ thống.
- Xác định rõ phạm vi bài toán và đối tượng sử dụng.

**2\. Phân tích yêu cầu và Use Cases**

- Trình bày danh sách các use cases chính của hệ thống.
- Mỗi use case cần mô tả ngắn gọn chức năng và nghiệp vụ xử lý.
- Yêu cầu tối thiểu: tối thiểu 15 use cases.

**3\. Thiết kế cơ sở dữ liệu quan hệ**

- Xác định các thực thể, thuộc tính và mối quan hệ giữa các thực thể.
- Trình bày sơ đồ ERD (logic hoặc vật lý).
- Chỉ rõ khóa chính, khóa ngoại và các ràng buộc dữ liệu.
- Yêu cầu tối thiểu: CSDL đạt ít nhất chuẩn 3NF.

**4\. Xây dựng các khối lệnh PL/SQL**

- Phát triển các chương trình xử lý nghiệp vụ bằng PL/SQL đáp ứng các use cases trên đây, sử dụng đầy đủ các thành phần: Stored Procedure, Function, Package, Trigger.
- Yêu cầu:
  - Có procedure và function phục vụ nghiệp vụ chính;
  - Có ít nhất 01 trigger đảm bảo ràng buộc hoặc ghi nhận lịch sử.
  - Các khối PL/SQL phải có xử lý ngoại lệ (exception handling).
  - Sử dụng commit/rollback hợp lý trong các giao dịch.
  - Minh họa được ít nhất 01 tình huống xử lý lỗi nghiệp vụ.

**5\. Triển khai cơ sở dữ liệu trong Oracle**

- Tạo schema/user riêng (hoặc PDB theo yêu cầu giảng viên).
- Xây dựng đầy đủ các đối tượng CSDL:
  - Bảng (tables) với các ràng buộc cần thiết;
  - Chỉ mục (indexes);
  - Sequence sinh khóa tự động;
  - View phục vụ truy vấn và phân quyền.
- Xây dựng dữ liệu mẫu phục vụ kiểm thử hệ thống.

**6\. Phân quyền, bảo mật CSDL**

- Thiết kế các role nghiệp vụ và gán quyền phù hợp.
- Tạo các user kiểm thử và kiểm tra quyền truy cập.
- Yêu cầu:
  - Ít nhất 02 role;
  - Ít nhất 02 user;
  - Thể hiện được sự khác nhau về quyền hạn giữa các user.

**7\. Kiểm thử**

- Có tối thiểu 10 kịch bản kiểm thử, bao gồm cả trường hợp hợp lệ và không hợp lệ.
- Các lệnh kiểm thử phải chạy được trên Oracle và có kết quả minh họa.

**8\. Kết luận**

- Đánh giá kết quả đạt được, những khó khăn trong quá trình thực hiện.
- Các bài học kinh nghiệm khi thực hiện đề tài:
  - Kinh nghiệm trong thiết kế mô hình CSDL và chuẩn hóa dữ liệu;
  - Kinh nghiệm trong triển khai, phân quyền và quản trị CSDL Oracle;
  - Kinh nghiệm trong viết và tổ chức mã PL/SQL, xử lý lỗi và giao dịch;

---

**III. DANH SÁCH CÁC ĐỀ TÀI**

<div class="scoring">

| **Mã <br>đề tài** | **Tên đề tài**                                                              |
| ----------------- | --------------------------------------------------------------------------- |
| 1                 | Xây dựng CSDL cho hệ thống quản lý ngân hàng máu.                           |
| 2                 | Xây dựng CSDL cho hệ thống quản lý hiến tạng và ghép tạng.                  |
| 3                 | Xây dựng CSDL cho hệ thống quản lý trung tâm cứu hộ động vật.               |
| 4                 | Xây dựng CSDL cho hệ thống quản lý đội xe buýt công cộng.                   |
| 5                 | Xây dựng CSDL cho hệ thống quản lý tàu điện đô thị.                         |
| 6                 | Xây dựng CSDL cho hệ thống quản lý cảng biển và tàu hàng.                   |
| 7                 | Xây dựng CSDL cho hệ thống quản lý sân vận động đa năng.                    |
| 8                 | Xây dựng CSDL cho hệ thống quản lý khu công nghiệp.                         |
| 9                 | Xây dựng CSDL cho hệ thống quản lý chuỗi cửa hàng giặt là.                  |
| 10                | Xây dựng CSDL cho hệ thống quản lý dịch vụ chuyển nhà.                      |
| 11                | Xây dựng CSDL cho hệ thống quản lý trung tâm chăm sóc người cao tuổi.       |
| 12                | Xây dựng CSDL cho hệ thống quản lý nhà trẻ tư thục.                         |
| 13                | Xây dựng CSDL cho hệ thống quản lý dịch vụ bảo vệ chuyên nghiệp.            |
| 14                | Xây dựng CSDL cho hệ thống quản lý tòa soạn xuất bản sách.                  |
| 15                | Xây dựng CSDL cho hệ thống quản lý bản quyền tác giả.                       |
| 16                | Xây dựng CSDL cho hệ thống quản lý sàn giao dịch bất động sản.              |
| 17                | Xây dựng CSDL cho hệ thống quản lý môi giới bảo hiểm.                       |
| 18                | Xây dựng CSDL cho hệ thống quản lý hợp tác xã nông nghiệp.                  |
| 19                | Xây dựng CSDL cho hệ thống quản lý chợ đầu mối nông sản.                    |
| 20                | Xây dựng CSDL cho hệ thống quản lý trung tâm kiểm định chất lượng sản phẩm. |
| 21                | Xây dựng CSDL cho hệ thống quản lý xưởng may và đơn hàng gia công.          |
| 22                | Xây dựng CSDL cho hệ thống quản lý nhà máy sản xuất thực phẩm.              |
| 23                | Xây dựng CSDL cho hệ thống quản lý dây chuyền sản xuất linh kiện điện tử.   |
| 24                | Xây dựng CSDL cho hệ thống quản lý cửa hàng vật liệu xây dựng.              |
| 25                | Xây dựng CSDL cho hệ thống quản lý trung tâm thương mại.                    |
| 26                | Xây dựng CSDL cho hệ thống quản lý siêu thị điện máy.                       |
| 27                | Xây dựng CSDL cho hệ thống quản lý cửa hàng hoa và dịch vụ điện hoa.        |
| 28                | Xây dựng CSDL cho hệ thống quản lý dịch vụ chăm sóc cây cảnh.               |
| 29                | Xây dựng CSDL cho hệ thống quản lý trung tâm tư vấn tâm lý.                 |
| 30                | Xây dựng CSDL cho hệ thống quản lý cơ sở cai nghiện.                        |
| 31                | Xây dựng CSDL cho hệ thống quản lý trạm quan trắc môi trường.               |
| 32                | Xây dựng CSDL cho hệ thống quản lý xử lý rác thải đô thị.                   |
| 33                | Xây dựng CSDL cho hệ thống quản lý hệ thống chiếu sáng công cộng.           |
| 34                | Xây dựng CSDL cho hệ thống quản lý cứu hộ cứu nạn.                          |
| 35                | Xây dựng CSDL cho hệ thống quản lý phòng cháy chữa cháy.                    |
| 36                | Xây dựng CSDL cho hệ thống quản lý trung tâm kiểm soát dịch bệnh.           |
| 37                | Xây dựng CSDL cho hệ thống quản lý câu lạc bộ đọc sách.                     |
| 38                | Xây dựng CSDL cho hệ thống quản lý học bổng và tài trợ giáo dục.            |
| 39                | Xây dựng CSDL cho hệ thống quản lý vườn quốc gia và bảo tồn động thực vật.  |
| 40                | Đề mở                                                                       |

</div>
