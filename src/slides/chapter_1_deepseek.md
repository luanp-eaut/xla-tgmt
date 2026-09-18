---
marp: true
theme: eaut
paginate: true
--------------

<!--_class: cover-->

<div class="middle">

# XỬ LÝ ẢNH & THỊ GIÁC MÁY TÍNH

## CHƯƠNG 1 - GIỚI THIỆU TỔNG QUAN

</div>

### Giảng viên: Nguyễn Phồn Lữa

---
<!-- _class: toc -->

# NỘI DUNG

1. Giới thiệu học phần
2. Tổng quan về xử lý ảnh & thị giác máy tính
3. Từ thế giới thực đến ảnh số
4. Biểu diễn và các quan hệ trong ảnh
5. Các phép toán cơ bản trên ảnh
6. Công cụ xử lý ảnh trong Python
7. Môi trường thực hành

---
<!-- _class: section -->

# Giới thiệu học phần

---

# 1. GIỚI THIỆU HỌC PHẦN

### Tên học phần

Học phần này có tên là **Xử lý ảnh và Thị giác máy tính**. Đây là một học phần nền tảng, đóng vai trò quan trọng trong việc giúp sinh viên tiếp cận lĩnh vực xử lý ảnh số và thị giác máy tính – hai lĩnh vực có mối liên hệ chặt chẽ với nhau và ngày càng trở nên quan trọng trong thời đại công nghệ số.

### Quy mô

Học phần được thiết kế với **3 tín chỉ**, trong đó bao gồm **2 tín chỉ lý thuyết** và **1 tín chỉ thực hành**. Thời lượng học tập được phân bổ trong khoảng **15 buổi học**, kết hợp giữa việc học trên lớp và thực hành tại phòng máy. Ngoài thời gian học chính thức, sinh viên cần dành khoảng **75 giờ tự học** để nghiên cứu tài liệu, hoàn thành bài tập và chuẩn bị cho các buổi học tiếp theo.

### Mục tiêu

Mục tiêu tổng quát của học phần là giúp sinh viên nắm vững các kiến thức nền tảng về xử lý ảnh và thị giác máy tính. Cụ thể, sinh viên cần hiểu được các kỹ thuật xử lý và phân tích ảnh cơ bản, đồng thời có khả năng sử dụng các công cụ lập trình để giải quyết những bài toán thực tế. Học phần hướng đến việc trang bị cho sinh viên cả kiến thức lý thuyết lẫn kỹ năng thực hành, tạo nền tảng vững chắc cho các học phần chuyên sâu tiếp theo.

---

# 2. MỤC TIÊU HỌC TẬP

Sau khi hoàn thành học phần này, sinh viên sẽ có thể đạt được những mục tiêu cụ thể sau đây:

### Hiểu

Trước hết, sinh viên cần hiểu được ảnh số được hình thành và biểu diễn như thế nào. Điều này bao gồm việc nắm rõ quá trình từ khi ánh sáng được thu nhận bởi cảm biến cho đến khi trở thành dữ liệu số mà máy tính có thể xử lý. Bên cạnh đó, sinh viên cần hiểu các khái niệm cơ bản của Image Processing (xử lý ảnh) và Computer Vision (thị giác máy tính), cũng như phân biệt được sự khác nhau và mối quan hệ giữa hai lĩnh vực này. Ngoài ra, việc nắm vững các kỹ thuật xử lý ảnh cơ bản cũng là một mục tiêu quan trọng.

### Thực hiện

Về mặt kỹ năng, sinh viên cần có khả năng đọc, hiển thị và biến đổi ảnh bằng các công cụ lập trình. Sinh viên cũng cần thực hiện được các phép toán trên ảnh như cộng, trừ, nhân, chia theo từng pixel, cũng như áp dụng các kỹ thuật lọc, phát hiện biên và phân vùng ảnh. Những kỹ năng này sẽ được rèn luyện thông qua các bài tập thực hành trên lớp và bài tập lớn.

### Vận dụng

Ở mức độ cao hơn, sinh viên cần biết cách xây dựng pipeline xử lý ảnh – tức là chuỗi các bước xử lý từ đầu vào đến đầu ra. Sinh viên cũng cần sử dụng thành thạo Python và các thư viện xử lý ảnh phổ biến, đồng thời có khả năng giải quyết các bài toán Computer Vision cơ bản. Đây là những kỹ năng thiết yếu để sinh viên có thể tiếp tục học tập và làm việc trong lĩnh vực này.

---

# 3. PHƯƠNG PHÁP ĐÁNH GIÁ

Kết quả học tập của sinh viên được đánh giá thông qua nhiều thành phần khác nhau, nhằm đảm bảo tính toàn diện và công bằng trong quá trình đánh giá.

| Thành phần            | Tỷ trọng |
| --------------------- | -------: |
| Chuyên cần            |  **10%** |
| Quá trình / giữa kỳ   |  **30%** |
| Cuối kỳ – Bài tập lớn |  **60%** |

### Bài tập lớn

Bài tập lớn là một phần quan trọng trong đánh giá cuối kỳ, chiếm **60%** tổng điểm. Sinh viên sẽ làm việc theo nhóm từ **3 đến 5 sinh viên**. Mỗi nhóm tự chọn đề tài phù hợp với nội dung học phần, nhưng các nhóm không được trùng đề tài với nhau. Kết quả của bài tập lớn bao gồm sản phẩm hoàn chỉnh, báo cáo và phần vấn đáp. Quy trình này giúp sinh viên rèn luyện kỹ năng làm việc nhóm, kỹ năng nghiên cứu và kỹ năng trình bày – những kỹ năng cần thiết cho công việc sau này.

---

# 4. BÀI TẬP LỚN

### Quy trình thực hiện

Bài tập lớn được thực hiện theo một quy trình rõ ràng, bao gồm nhiều bước từ khi bắt đầu đến khi hoàn thành:

```text
Chọn bài toán
      ↓
Phân tích yêu cầu
      ↓
Thu thập / chọn dữ liệu
      ↓
Thiết kế phương pháp
      ↓
Cài đặt
      ↓
Thực nghiệm
      ↓
Đánh giá
      ↓
Báo cáo & vấn đáp
```

Đầu tiên, sinh viên cần chọn bài toán phù hợp với nội dung học phần và sở thích của nhóm. Sau đó, nhóm tiến hành phân tích yêu cầu của bài toán để hiểu rõ mục tiêu và phạm vi cần giải quyết. Tiếp theo, nhóm thu thập hoặc lựa chọn dữ liệu phù hợp – đây là bước quan trọng vì chất lượng dữ liệu ảnh hưởng lớn đến kết quả. Nhóm thiết kế phương pháp giải quyết bài toán, sau đó tiến hành cài đặt và thực nghiệm. Kết quả thực nghiệm được đánh giá một cách khách quan trước khi nhóm hoàn thiện báo cáo và thực hiện vấn đáp.

### Đánh giá

Bài tập lớn được đánh giá dựa trên ba tiêu chí chính. Hình thức báo cáo chiếm **10%** – đánh giá cách trình bày, bố cục và tính chuyên nghiệp của báo cáo. Nội dung báo cáo chiếm **50%** – đánh giá chất lượng nghiên cứu, tính đúng đắn của phương pháp và kết quả đạt được. Phần vấn đáp chiếm **40%** – đánh giá mức độ hiểu biết của sinh viên về bài toán và khả năng giải thích, bảo vệ kết quả của mình.

---

# 5. ROADMAP HỌC PHẦN

Học phần được thiết kế theo một lộ trình logic, từ nền tảng đến ứng dụng nâng cao:

```text
CHƯƠNG 1
Nền tảng
   ↓
CHƯƠNG 2
Biến đổi ảnh
   ↓
CHƯƠNG 3
Nén ảnh
   ↓
CHƯƠNG 4
Phát hiện biên & phân vùng
   ↓
CHƯƠNG 5
Thị giác máy tính
```

Chương 1 đặt nền tảng với các khái niệm cơ bản về ảnh số, pixel, biểu diễn ảnh và các phép toán cơ bản. Chương 2 đi sâu vào các kỹ thuật biến đổi ảnh, bao gồm biến đổi điểm, xử lý histogram và biến đổi miền tần số. Chương 3 đề cập đến nén ảnh – một chủ đề quan trọng trong xử lý ảnh. Chương 4 tập trung vào phát hiện biên và phân vùng ảnh. Cuối cùng, Chương 5 giới thiệu về thị giác máy tính – lĩnh vực ứng dụng cao cấp của xử lý ảnh.

### Câu hỏi xuyên suốt

> **Làm thế nào để biến một hình ảnh thành thông tin có ý nghĩa?**

Đây là câu hỏi xuyên suốt toàn bộ học phần, định hướng cho mọi nội dung được trình bày. Mục tiêu cuối cùng của xử lý ảnh và thị giác máy tính không chỉ là biến đổi ảnh mà là trích xuất thông tin có ý nghĩa, giúp máy tính có thể hiểu và ra quyết định dựa trên dữ liệu hình ảnh.

---
<!--_class: section-->

# <!--fit-->Tổng quan về xử lý ảnh & thị giác máy tính

---

# 6. TỪ THẾ GIỚI THỰC ĐẾN MÁY TÍNH

Khi con người nhìn vào một bức ảnh, chúng ta dễ dàng nhận ra người, xe, nhà, cây, chữ viết và khuôn mặt. Đây là kết quả của quá trình nhận thức thị giác phức tạp diễn ra trong não bộ, được hình thành qua hàng triệu năm tiến hóa. Tuy nhiên, máy tính không "nhìn" ảnh theo cách con người nhìn. Máy tính không có khả năng nhận thức trực quan như con người.

Thay vào đó, máy tính nhận được:

> **Dữ liệu số biểu diễn năng lượng ánh sáng hoặc các dạng tín hiệu khác.**

Đối với máy tính, một bức ảnh chỉ là một tập hợp các con số được tổ chức theo một cấu trúc nhất định. Nhiệm vụ của xử lý ảnh và thị giác máy tính là xây dựng các phương pháp để từ dữ liệu số thô này, máy tính có thể trích xuất thông tin hữu ích và đưa ra quyết định. Đây là một thách thức lớn, đòi hỏi sự kết hợp của nhiều lĩnh vực như toán học, khoa học máy tính và trí tuệ nhân tạo.

---

# 7. ẢNH LÀ GÌ?

Một cách mô hình hóa ảnh mức xám là biểu diễn nó như một hàm hai biến:

$$
f(x,y)
$$

Trong đó:

* \(x, y\): tọa độ không gian, xác định vị trí của điểm ảnh.
* \(f(x,y)\): cường độ tại vị trí \((x,y)\), biểu thị độ sáng hoặc màu sắc tại điểm đó.

### Có thể hiểu đơn giản

> **Ảnh là một hàm mô tả cường độ tại mỗi vị trí trong không gian.**

Cách mô hình hóa này rất hữu ích vì nó cho phép chúng ta áp dụng các công cụ toán học để phân tích và xử lý ảnh. Trong thực tế, ảnh có thể là ảnh mức xám (grayscale) với một giá trị cường độ duy nhất tại mỗi điểm, hoặc ảnh màu với nhiều thành phần màu tại mỗi điểm. Mô hình hàm cũng giúp phân biệt giữa ảnh liên tục (continuous image) và ảnh số (digital image) – một khái niệm quan trọng sẽ được trình bày ở phần sau.

---

# 8. ẢNH SỐ

Ảnh số là ảnh mà:

* Tọa độ không gian được số hóa – tức là được rời rạc hóa thành các điểm rời rạc.
* Giá trị cường độ được số hóa – tức là được lượng tử hóa thành các mức rời rạc.
* Các giá trị chỉ nhận một tập hữu hạn các giá trị rời rạc.

Điều này có nghĩa là ảnh số không còn là một hàm liên tục mà trở thành một tập hợp các điểm rời rạc với giá trị cụ thể. Nhờ đó, ảnh số có thể được lưu trữ, xử lý và truyền tải bởi máy tính.

Có thể biểu diễn ảnh bằng **ma trận**:

$$
f(x,y) \rightarrow
\begin{bmatrix}
f(0,0)&f(0,1)&\cdots\\
f(1,0)&f(1,1)&\cdots\\
\vdots&\vdots&\ddots
\end{bmatrix}
$$

Cách biểu diễn này là nền tảng cho mọi phép toán trên ảnh số. Mỗi phần tử trong ma trận tương ứng với một pixel, và các phép toán trên ma trận có thể được áp dụng để xử lý ảnh. Đây cũng là lý do tại sao các thư viện như NumPy – vốn được thiết kế cho tính toán ma trận – lại đóng vai trò quan trọng trong xử lý ảnh bằng Python.

---

# 9. PIXEL – PHẦN TỬ ẢNH

**Pixel – Picture Element**

Pixel là phần tử cơ bản cấu tạo nên ảnh số. Mỗi pixel đại diện cho một điểm nhỏ nhất trong ảnh, và toàn bộ ảnh được tạo thành từ tập hợp các pixel này.

Mỗi pixel có:

* Một vị trí – xác định tọa độ của pixel trong ảnh.
* Một giá trị – biểu thị cường độ sáng hoặc màu sắc tại vị trí đó.

Ví dụ ảnh mức xám:

```text
┌────┬────┬────┬────┐
│  12│  30│  45│  70│
├────┼────┼────┼────┤
│  18│  42│  80│ 100│
├────┼────┼────┼────┤
│  25│  60│ 110│ 150│
└────┴────┴────┴────┘
```

Trong ví dụ trên, mỗi con số biểu thị cường độ sáng của một pixel. Giá trị càng lớn → pixel càng sáng. Giá trị nhỏ → pixel tối hơn. Với ảnh 8-bit, giá trị pixel nằm trong khoảng từ 0 đến 255, trong đó 0 là đen hoàn toàn và 255 là trắng hoàn toàn.

---

# 10. ẢNH XÁM VÀ ẢNH MÀU

### Ảnh mức xám

Trong ảnh mức xám, mỗi pixel thường có một giá trị duy nhất biểu thị độ sáng:

$$
0 \leq f(x,y) \leq 255
$$

với ảnh 8-bit. Các giá trị này tương ứng với các mức xám khác nhau:

* 0 → đen
* 255 → trắng
* Các giá trị ở giữa → các mức xám trung gian

Ảnh mức xám thường được sử dụng trong các bài toán xử lý ảnh cơ bản vì đơn giản hơn và yêu cầu ít tài nguyên tính toán hơn so với ảnh màu.

### Ảnh màu

Trong ảnh màu, mỗi pixel thường được biểu diễn bởi nhiều thành phần màu. Ví dụ, trong không gian màu RGB:

$$
Pixel=(R,G,B)
$$

Mỗi thành phần R (Red – đỏ), G (Green – xanh lá), B (Blue – xanh dương) có giá trị từ 0 đến 255 trong ảnh 8-bit. Bằng cách kết hợp ba thành phần này, ta có thể biểu diễn hầu hết các màu sắc mà mắt người có thể nhìn thấy. Ngoài RGB, còn có nhiều không gian màu khác như HSV, CMYK, Lab, mỗi không gian phù hợp với những mục đích xử lý khác nhau.

---

# 11. IMAGE PROCESSING LÀ GÌ?

**Image Processing – Xử lý ảnh**

Image Processing là tập hợp các phương pháp dùng để:

* Biến đổi ảnh – thay đổi hình dạng, kích thước, màu sắc hoặc các thuộc tính khác của ảnh.
* Cải thiện chất lượng ảnh – làm cho ảnh rõ hơn, đẹp hơn hoặc dễ phân tích hơn.
* Khôi phục ảnh – phục hồi ảnh bị hỏng, bị nhiễu hoặc bị mất thông tin.
* Trích xuất thông tin từ ảnh – lấy ra các đặc trưng hoặc thông tin hữu ích từ ảnh.

Ví dụ:

```text
Ảnh tối
  ↓
Tăng độ sáng
  ↓
Ảnh sáng hơn
```

```text
Ảnh nhiễu
  ↓
Lọc nhiễu
  ↓
Ảnh ít nhiễu hơn
```

Image Processing thường tập trung vào việc xử lý ảnh ở mức thấp và trung bình, tức là làm việc trực tiếp với các pixel hoặc các vùng nhỏ của ảnh. Kết quả của Image Processing thường là một ảnh mới đã được cải thiện hoặc biến đổi, sẵn sàng cho các bước xử lý tiếp theo.

---

# 12. COMPUTER VISION LÀ GÌ?

**Computer Vision – Thị giác máy tính**

Computer Vision là lĩnh vực nghiên cứu cách máy tính:

> **thu nhận, xử lý, phân tích và suy luận thông tin từ hình ảnh hoặc video.**

Khác với Image Processing – vốn tập trung vào việc biến đổi ảnh – Computer Vision hướng đến việc hiểu nội dung của ảnh. Mục tiêu của Computer Vision là làm cho máy tính có thể "nhìn" và "hiểu" thế giới xung quanh theo cách tương tự con người.

Ví dụ:

```text
Camera
   ↓
Image
   ↓
Object Detection
   ↓
┌───────────────┐
│ 2 người       │
│ 1 chiếc xe    │
│ 1 chiếc xe máy│
└───────────────┘
```

Trong ví dụ trên, hệ thống Computer Vision không chỉ xử lý ảnh mà còn nhận diện được các đối tượng có trong ảnh – một nhiệm vụ đòi hỏi khả năng phân tích và suy luận ở mức cao. Computer Vision là nền tảng cho nhiều ứng dụng quan trọng như xe tự lái, nhận dạng khuôn mặt, phân tích ảnh y tế và nhiều ứng dụng khác.

---

# 13. IMAGE PROCESSING vs COMPUTER VISION

| Image Processing    | Computer Vision     |
| ------------------- | ------------------- |
| Biến đổi ảnh        | Hiểu nội dung ảnh   |
| Cải thiện ảnh       | Nhận biết đối tượng |
| Lọc nhiễu           | Phát hiện đối tượng |
| Tăng tương phản     | Phân loại           |
| Sharpening          | Tracking            |
| Geometric transform | Recognition         |

### Tuy nhiên

> Hai lĩnh vực **không có ranh giới tuyệt đối**.

Trong thực tế, Image Processing và Computer Vision có mối quan hệ chặt chẽ và bổ sung cho nhau. Computer Vision thường sử dụng nhiều kỹ thuật Image Processing làm nền tảng – ví dụ, trước khi nhận diện đối tượng, ta cần lọc nhiễu và cải thiện chất lượng ảnh. Ngược lại, các kết quả từ Computer Vision có thể được sử dụng để định hướng cho các bước xử lý ảnh tiếp theo. Sự phân biệt giữa hai lĩnh vực chủ yếu mang tính học thuật, còn trong thực tế, chúng thường được kết hợp trong cùng một hệ thống.

---

# 14. BA MỨC ĐỘ XỬ LÝ

Xử lý ảnh và thị giác máy tính có thể được phân chia thành ba mức độ, tùy theo độ phức tạp và mục tiêu của quá trình xử lý:

### Low-level

Ở mức thấp, **input** là ảnh và **output** cũng là ảnh. Các kỹ thuật ở mức này tập trung vào việc cải thiện chất lượng ảnh hoặc biến đổi ảnh mà không quan tâm đến nội dung ngữ nghĩa của ảnh.

Ví dụ:

* Denoising – lọc nhiễu
* Enhancement – tăng cường chất lượng ảnh
* Sharpening – làm sắc nét ảnh

### Mid-level

Ở mức trung bình, **input** là ảnh và **output** là các đặc trưng hoặc cấu trúc được trích xuất từ ảnh. Các kỹ thuật ở mức này bắt đầu phân tích nội dung của ảnh ở mức độ nhất định.

Ví dụ:

* Segmentation – phân vùng ảnh
* Edge detection – phát hiện biên
* Feature extraction – trích xuất đặc trưng

### High-level

Ở mức cao, **input** là thông tin hình ảnh (đã qua xử lý) và **output** là hiểu biết hoặc quyết định. Đây là mức độ của Computer Vision, nơi máy tính không chỉ xử lý ảnh mà còn "hiểu" nội dung của ảnh.

Ví dụ:

* Object recognition – nhận dạng đối tượng
* Scene understanding – hiểu cảnh
* Activity recognition – nhận dạng hoạt động

---

# 15. PIPELINE TỔNG QUÁT

Một hệ thống xử lý ảnh và thị giác máy tính hoàn chỉnh thường tuân theo một pipeline (quy trình) tổng quát như sau:

```text
ẢNH / VIDEO / CAMERA
          │
          ▼
   Image Acquisition
          │
          ▼
    Pre-processing
          │
          ▼
Representation / Features
          │
          ▼
 ┌────────┼─────────┐
 ▼        ▼         ▼
Class.  Detection  Segmentation
 └────────┼─────────┘
          ▼
    Interpretation
          │
          ▼
       Decision
```

Quá trình bắt đầu từ việc thu nhận ảnh hoặc video từ camera. Sau đó, ảnh được tiền xử lý để cải thiện chất lượng và loại bỏ nhiễu. Tiếp theo, các đặc trưng hoặc biểu diễn của ảnh được trích xuất. Tùy theo bài toán, hệ thống có thể thực hiện phân loại, phát hiện đối tượng hoặc phân vùng ảnh. Kết quả của các bước này được diễn giải để đưa ra quyết định cuối cùng.

### Mục tiêu cuối cùng

> **Biến dữ liệu hình ảnh thành thông tin hữu ích.**

Đây là mục tiêu xuyên suốt của toàn bộ pipeline. Mỗi bước trong pipeline đều hướng đến việc chuyển đổi dữ liệu thô thành thông tin có ý nghĩa, phục vụ cho việc ra quyết định.

---

# 16. ỨNG DỤNG

Xử lý ảnh và thị giác máy tính có rất nhiều ứng dụng trong thực tế, trải rộng trên nhiều lĩnh vực khác nhau:

### Y tế

Trong y tế, xử lý ảnh được sử dụng để phân tích các loại ảnh y khoa như X-quang, CT (Computed Tomography), MRI (Magnetic Resonance Imaging). Các kỹ thuật xử lý ảnh giúp bác sĩ phát hiện bệnh sớm, theo dõi tiến triển của bệnh và lập kế hoạch điều trị. Ví dụ, phát hiện khối u trong ảnh X-quang hoặc phân đoạn các cơ quan trong ảnh CT.

### Công nghiệp

Trong công nghiệp, xử lý ảnh được ứng dụng để kiểm tra lỗi sản phẩm trên dây chuyền sản xuất, đếm sản phẩm và đo kích thước. Các hệ thống này giúp tăng năng suất, giảm chi phí và đảm bảo chất lượng sản phẩm. Ví dụ, phát hiện vết nứt trên bề mặt sản phẩm hoặc kiểm tra kích thước của linh kiện điện tử.

### Giao thông

Trong giao thông, xử lý ảnh được sử dụng để nhận dạng biển số xe, phát hiện phương tiện và giám sát giao thông. Các hệ thống này giúp quản lý giao thông hiệu quả hơn, giảm ùn tắc và tăng cường an toàn. Ví dụ, hệ thống camera giao thông tự động phát hiện vi phạm hoặc hệ thống đếm lưu lượng xe.

### An ninh

Trong lĩnh vực an ninh, xử lý ảnh được sử dụng để nhận dạng khuôn mặt và theo dõi đối tượng. Các hệ thống này được triển khai tại sân bay, nhà ga, trung tâm thương mại và nhiều địa điểm công cộng khác. Ví dụ, hệ thống camera an ninh tự động phát hiện người lạ hoặc theo dõi hành vi bất thường.

### Viễn thám

Trong viễn thám, xử lý ảnh được sử dụng để phân tích ảnh vệ tinh, theo dõi môi trường và phân tích đất đai. Các ứng dụng này giúp theo dõi biến đổi khí hậu, quản lý tài nguyên thiên nhiên và quy hoạch đô thị. Ví dụ, theo dõi diện tích rừng bị mất hoặc phân loại loại đất từ ảnh vệ tinh.

---

# 17. ẢNH KHÔNG CHỈ LÀ ÁNH SÁNG KHẢ KIẾN

Con người chủ yếu quan sát vùng ánh sáng khả kiến – một khoảng rất hẹp trong phổ điện từ. Tuy nhiên, máy móc có thể thu nhận nhiều loại tín hiệu hơn, mở rộng đáng kể khả năng "nhìn" của chúng ta:

```text
Gamma
  │
X-ray
  │
UV
  │
Visible
  │
Infrared
  │
Microwave
  │
Radio
```

Mỗi loại tín hiệu này mang lại thông tin khác nhau về thế giới. Ví dụ, tia X có thể xuyên qua vật chất và được sử dụng trong y tế để chụp ảnh xương. Tia hồng ngoại có thể phát hiện nhiệt độ và được sử dụng trong camera nhiệt. Sóng radio được sử dụng trong radar và viễn thám.

Ngoài phổ điện từ còn có:

* Siêu âm – sử dụng sóng âm thanh để tạo ảnh, thường dùng trong y tế.
* Kính hiển vi điện tử – sử dụng chùm electron để tạo ảnh với độ phân giải rất cao.
* Các hệ thống cảm biến chuyên dụng – như cảm biến depth, LiDAR, và nhiều loại khác.

---

# 18. LỊCH SỬ PHÁT TRIỂN

Lịch sử phát triển của xử lý ảnh và thị giác máy tính trải qua nhiều giai đoạn quan trọng:

```text
1920s
Truyền ảnh
   ↓
1960s
Computer + Space Imaging
   ↓
1970s
Medical Imaging
   ↓
1980s–1990s
Digital Image Processing
   ↓
2000s
Computer Vision
   ↓
2010s
Deep Learning
   ↓
2020s
Vision + AI + Multimodal Systems
```

Vào những năm 1920, việc truyền ảnh qua khoảng cách xa bắt đầu được thực hiện. Đến những năm 1960, sự kết hợp giữa máy tính và ảnh không gian đánh dấu sự khởi đầu của xử lý ảnh số. Những năm 1970 chứng kiến sự phát triển của ảnh y tế. Giai đoạn 1980–1990 là thời kỳ phát triển mạnh mẽ của xử lý ảnh số. Từ năm 2000, Computer Vision trở thành lĩnh vực nghiên cứu sôi động. Thập niên 2010 đánh dấu sự bùng nổ của Deep Learning trong thị giác máy tính. Và từ năm 2020 đến nay, chúng ta đang chứng kiến sự hội tụ của thị giác, AI và các hệ thống đa phương thức.

### Ý tưởng chính

> Sự phát triển của xử lý ảnh gắn chặt với sự phát triển của **cảm biến, máy tính và AI**.

Mỗi bước tiến trong công nghệ cảm biến, sức mạnh tính toán và thuật toán AI đều mở ra những khả năng mới cho xử lý ảnh và thị giác máy tính.

---
<!--_class: section-->

# Từ thế giới thực đến ảnh số

---

# 19. THỊ GIÁC CON NGƯỜI

Mắt người là một hệ thống thu nhận và xử lý thông tin quang học phức tạp, được tinh chỉnh qua hàng triệu năm tiến hóa. Hiểu về thị giác con người giúp chúng ta có cái nhìn sâu sắc về cách xây dựng các hệ thống thị giác máy tính.

Một số thành phần chính của mắt người:

* **Cornea:** giác mạc – lớp trong suốt ở phía trước mắt, giúp hội tụ ánh sáng.
* **Iris:** mống mắt – phần có màu, điều chỉnh lượng ánh sáng vào mắt.
* **Lens:** thủy tinh thể – thấu kính tự nhiên, điều chỉnh tiêu cự để nhìn rõ vật ở các khoảng cách khác nhau.
* **Retina:** võng mạc – lớp tế bào cảm quang ở phía sau mắt, nơi ánh sáng được chuyển thành tín hiệu thần kinh.
* **Rods:** tế bào hình que – nhạy cảm với ánh sáng yếu, giúp nhìn trong điều kiện thiếu sáng.
* **Cones:** tế bào hình nón – nhạy cảm với màu sắc, giúp nhìn màu và chi tiết.

### Ý nghĩa đối với Computer Vision

Nghiên cứu thị giác người giúp chúng ta hiểu:

* Ánh sáng – cách ánh sáng được thu nhận và xử lý.
* Độ sáng – cách con người cảm nhận độ sáng.
* Độ tương phản – cách con người phân biệt các vùng sáng tối.
* Màu sắc – cách con người cảm nhận màu.
* Nhận thức thị giác – cách não bộ diễn giải thông tin từ mắt.

Những hiểu biết này đã truyền cảm hứng cho nhiều thuật toán và mô hình trong Computer Vision.

---

# 20. ÁNH SÁNG VÀ ĐỘ SÁNG

Khả năng cảm nhận của mắt không đơn giản là:

> "Giá trị pixel lớn → luôn cảm thấy sáng hơn."

Thực tế, nhận thức về độ sáng phức tạp hơn nhiều. Nó phụ thuộc vào:

* Cường độ ánh sáng – lượng ánh sáng thực tế đến mắt.
* Nền xung quanh – bối cảnh mà vật thể được đặt trong đó.
* Tương phản – sự khác biệt giữa vật thể và nền.
* Điều kiện quan sát – môi trường và trạng thái của người quan sát.

### Ví dụ

Một vùng xám giống nhau có thể được cảm nhận khác nhau khi đặt trên:

* Nền sáng – vùng xám trông tối hơn.
* Nền tối – vùng xám trông sáng hơn.

Hiện tượng này được gọi là **độ tương phản đồng thời** (simultaneous contrast) và là một ví dụ điển hình cho thấy nhận thức thị giác không chỉ phụ thuộc vào giá trị pixel mà còn phụ thuộc vào ngữ cảnh. Điều này có ý nghĩa quan trọng trong thiết kế các hệ thống Computer Vision, vì máy tính cũng cần xem xét ngữ cảnh để hiểu đúng nội dung ảnh.

---

# 21. PHỔ ĐIỆN TỪ

Sóng điện từ được mô tả bởi mối quan hệ giữa bước sóng và tần số:

$$
c=\lambda\nu
$$

Trong đó:

* $c$: tốc độ ánh sáng trong chân không (khoảng $3 \times 10^8$ m/s).
* $\lambda$: bước sóng – khoảng cách giữa hai đỉnh sóng liên tiếp.
* $\nu$: tần số – số dao động trong một đơn vị thời gian.

Năng lượng của photon – hạt ánh sáng – được tính bởi:

$$
E=h\nu
$$

Trong đó $h$ là hằng số Planck. Công thức này cho thấy ánh sáng có tần số càng cao thì năng lượng càng lớn.

### Ánh sáng khả kiến

Ánh sáng khả kiến – phần phổ điện từ mà mắt người có thể nhìn thấy – nằm trong một khoảng rất hẹp, từ khoảng 380 nm (tím) đến 700 nm (đỏ). Mặc dù hẹp, đây là vùng quan trọng nhất đối với thị giác con người và hầu hết các ứng dụng xử lý ảnh thông thường.

---

# 22. THU NHẬN ẢNH

Một hệ thống thu nhận ảnh có thể được mô hình hóa theo sơ đồ sau:

```text
Nguồn năng lượng
       ↓
     Vật thể
       ↓
  Phản xạ / truyền qua
       ↓
     Cảm biến
       ↓
   Tín hiệu điện
       ↓
    Số hóa
       ↓
     Ảnh số
```

Quá trình bắt đầu từ nguồn năng lượng – có thể là ánh sáng mặt trời, đèn nhân tạo, hoặc các nguồn năng lượng khác như tia X, sóng siêu âm. Năng lượng này chiếu vào vật thể và bị phản xạ hoặc truyền qua. Ánh sáng phản xạ hoặc truyền qua được cảm biến thu nhận và chuyển thành tín hiệu điện. Tín hiệu điện này sau đó được số hóa để trở thành ảnh số mà máy tính có thể xử lý.

Mỗi bước trong quá trình này đều ảnh hưởng đến chất lượng của ảnh cuối cùng. Nguồn sáng không ổn định, vật thể có đặc tính phản xạ phức tạp, cảm biến có nhiễu – tất cả đều là những yếu tố cần được xem xét khi thiết kế hệ thống thu nhận ảnh.

---

# 23. CẢM BIẾN ẢNH

Có ba mô hình cảm biến cơ bản được sử dụng trong thu nhận ảnh:

### 1. Single sensor

Một cảm biến duy nhất được sử dụng để thu nhận ảnh. Để tạo ra ảnh 2D, cảm biến cần được di chuyển theo hai chiều để quét toàn bộ vật thể. Phương pháp này thường được sử dụng trong các ứng dụng đòi hỏi độ chính xác cao nhưng tốc độ không quan trọng.

→ Cần chuyển động để quét ảnh.

### 2. Sensor strip

Một dải cảm biến – bao gồm nhiều cảm biến xếp thành hàng – được sử dụng. Dải cảm biến này chỉ cần di chuyển theo một chiều để quét toàn bộ vật thể. Phương pháp này nhanh hơn so với single sensor và thường được sử dụng trong máy scan.

→ Cần chuyển động theo một chiều.

### 3. Sensor array

Một mảng cảm biến 2D – bao gồm nhiều cảm biến xếp thành lưới – được sử dụng. Mảng cảm biến này có thể thu nhận toàn bộ ảnh trong một lần chụp mà không cần di chuyển. Đây là phương pháp phổ biến nhất trong camera kỹ thuật số hiện đại.

→ Thu nhận toàn bộ ảnh trong một lần chụp.

Ví dụ:

**CCD, CMOS** – hai công nghệ cảm biến phổ biến nhất hiện nay. CCD (Charge-Coupled Device) thường cho chất lượng ảnh tốt hơn, trong khi CMOS (Complementary Metal-Oxide-Semiconductor) có tốc độ cao hơn và tiêu thụ ít năng lượng hơn.

---

# 24. MÔ HÌNH HÌNH THÀNH ẢNH

Một mô hình đơn giản để mô tả quá trình hình thành ảnh là:

$$
f(x,y)=i(x,y)r(x,y)
$$

Trong đó:

* $i(x,y)$: **Illumination** – thành phần chiếu sáng, biểu thị lượng ánh sáng chiếu đến vị trí $(x,y)$.
* *r(x,y)*: **Reflectance** – thành phần phản xạ, biểu thị khả năng phản xạ ánh sáng của bề mặt tại vị trí $(x,y)$.

### Ý nghĩa

Độ sáng quan sát được phụ thuộc cả:

> **nguồn sáng + đặc tính bề mặt vật thể**

Công thức này cho thấy ảnh không chỉ phụ thuộc vào vật thể mà còn phụ thuộc vào điều kiện chiếu sáng. Hai vật thể có cùng đặc tính phản xạ nhưng dưới điều kiện chiếu sáng khác nhau sẽ tạo ra ảnh khác nhau. Đây là một thách thức lớn trong Computer Vision, vì hệ thống cần có khả năng nhận biết vật thể bất kể điều kiện ánh sáng.

---

# 25. VÍ DỤ: CHIẾU SÁNG VÀ PHẢN XẠ

Hai vật thể có cùng màu nhưng dưới điều kiện chiếu sáng khác nhau có thể tạo ra ảnh rất khác nhau. Điều này được minh họa qua sơ đồ sau:

```text
        Nguồn sáng
            ↓
      ┌───────────┐
      │  Vật thể  │
      └───────────┘
            ↓
       Ánh sáng phản xạ
            ↓
         Camera
```

Khi nguồn sáng thay đổi – về cường độ, hướng chiếu, hoặc màu sắc – ảnh thu được cũng thay đổi theo. Ví dụ, một chiếc áo trắng dưới ánh nắng mặt trời sẽ trông rất khác so với dưới ánh đèn vàng. Tương tự, một bề mặt bóng sẽ phản xạ ánh sáng mạnh hơn so với bề mặt nhám.

Do đó:

> Một hệ thống Computer Vision phải quan tâm đến **điều kiện ánh sáng**.

Các kỹ thuật như cân bằng trắng (white balance), chuẩn hóa ánh sáng (illumination normalization) và mô hình hóa ánh sáng (lighting modeling) được sử dụng để giảm thiểu ảnh hưởng của điều kiện chiếu sáng đến kết quả nhận dạng.

---

# 26. TỪ ẢNH LIÊN TỤC ĐẾN ẢNH SỐ

Ảnh thực tế có thể được xem là tín hiệu liên tục – cả về tọa độ không gian lẫn giá trị cường độ. Tuy nhiên, để máy tính xử lý, ảnh cần được số hóa. Quá trình này bao gồm hai bước chính:

```text
Ảnh liên tục
     │
     ├──────────────┐
     ▼              ▼
 Sampling       Quantization
     │              │
     ▼              ▼
Tọa độ rời rạc   Mức cường độ rời rạc
     └──────────────┘
             │
             ▼
          Ảnh số
```

Sampling (lấy mẫu) là quá trình số hóa tọa độ không gian – biến đổi tọa độ liên tục thành các điểm rời rạc. Quantization (lượng tử hóa) là quá trình số hóa biên độ cường độ – biến đổi giá trị liên tục thành các mức rời rạc. Kết quả của hai quá trình này là ảnh số – một ma trận các pixel với giá trị cụ thể.

---

# 27. SAMPLING

**Sampling – Lấy mẫu**

Sampling là quá trình số hóa **tọa độ không gian**. Quá trình này quyết định:

> **Độ phân giải không gian của ảnh.**

Khi sampling nhiều – tức là lấy mẫu dày đặc – ảnh có nhiều pixel, độ phân giải cao, chi tiết không gian được giữ lại tốt:

```text
● ● ● ● ● ● ●
● ● ● ● ● ● ●
● ● ● ● ● ● ●
```

Khi sampling ít – tức là lấy mẫu thưa – ảnh có ít pixel, độ phân giải thấp, chi tiết không gian bị mất:

```text
●     ●     ●
      
●     ●     ●
```

### Sampling thấp → ít pixel → mất chi tiết không gian.

Điều này có nghĩa là nếu ta lấy mẫu quá thưa, ảnh sẽ bị mất các chi tiết nhỏ, các cạnh sắc nét và trở nên mờ hoặc bị răng cưa. Ngược lại, sampling dày đặc cho ảnh chất lượng cao hơn nhưng cũng đòi hỏi nhiều tài nguyên lưu trữ và tính toán hơn.

---

# 28. QUANTIZATION

**Quantization – Lượng tử hóa**

Quantization là quá trình số hóa **biên độ cường độ**. Quá trình này quyết định số lượng mức cường độ được sử dụng để biểu diễn ảnh.

Ví dụ:

### Nhiều mức xám

```text
0  20  40  60  80  100 ... 255
```

Với 256 mức xám (8-bit), ảnh có thể biểu diễn các sắc độ rất mịn, chuyển tiếp giữa các vùng sáng tối trông tự nhiên.

### Ít mức xám

```text
0      85      170      255
```

Với chỉ 4 mức xám (2-bit), ảnh chỉ có thể biểu diễn một số ít sắc độ, dẫn đến hiện tượng các vùng chuyển tiếp bị "nhảy bậc" rõ rệt.

### Quantization thấp

→ ít mức cường độ
→ dễ xuất hiện **false contouring**.

False contouring là hiện tượng các đường viền giả xuất hiện trong các vùng có gradient mượt mà, do số lượng mức cường độ không đủ để biểu diễn sự chuyển tiếp mượt mà. Hiện tượng này thường thấy trong các ảnh có quantization thấp.

---

# 29. SAMPLING vs QUANTIZATION

|           | Sampling                | Quantization         |
| --------- | ----------------------- | -------------------- |
| Số hóa    | Tọa độ                  | Cường độ             |
| Ảnh hưởng | Spatial resolution      | Intensity resolution |
| Quá thấp  | Mất chi tiết không gian | Mất chi tiết mức xám |
| Liên quan | Số pixel                | Số mức xám           |

### Ghi nhớ

> **Sampling → Where?**
> **Quantization → How much?**

Sampling xác định vị trí của các pixel – "ở đâu" trong không gian. Quantization xác định giá trị cường độ tại mỗi pixel – "bao nhiêu" ánh sáng. Hai quá trình này độc lập với nhau nhưng đều ảnh hưởng đến chất lượng ảnh số. Một ảnh có thể có độ phân giải không gian cao nhưng độ phân giải cường độ thấp, hoặc ngược lại.

---

# 30. ĐỘ PHÂN GIẢI

### Spatial Resolution

Spatial resolution (độ phân giải không gian) là khả năng biểu diễn chi tiết **không gian** của ảnh. Nó liên quan đến:

* Kích thước ảnh – số pixel theo mỗi chiều.
* Mật độ pixel – số pixel trên một đơn vị diện tích.
* Kích thước pixel – kích thước thực tế của mỗi pixel.

Độ phân giải không gian càng cao, ảnh càng có nhiều chi tiết không gian. Ví dụ, ảnh 1920×1080 có độ phân giải không gian cao hơn ảnh 640×480.

### Intensity Resolution

Intensity resolution (độ phân giải cường độ) là khả năng phân biệt các mức cường độ. Nó được xác định bởi số bit được sử dụng cho mỗi pixel.

Ví dụ ảnh 8-bit:

$$
L=2^8=256
$$

mức xám.

Độ phân giải cường độ càng cao, ảnh càng có nhiều mức xám, chuyển tiếp càng mượt. Ảnh 8-bit thường được sử dụng trong hầu hết các ứng dụng xử lý ảnh thông thường, trong khi ảnh 16-bit hoặc 32-bit được sử dụng trong các ứng dụng y tế hoặc khoa học đòi hỏi độ chính xác cao.

---

# 31. BITS VÀ MỨC XÁM

Nếu sử dụng \(k\) bit cho mỗi pixel, số mức xám có thể biểu diễn là:

$$
L=2^k
$$

Ví dụ:

|    Bit |    Mức |
| -----: | -----: |
|  1-bit |      2 |
|  2-bit |      4 |
|  4-bit |     16 |
|  8-bit |    256 |
| 16-bit | 65,536 |

### Ảnh 8-bit thường dùng trong các bài toán xử lý ảnh mức xám cơ bản.

Với 8-bit, mỗi pixel có thể nhận một trong 256 giá trị từ 0 đến 255. Đây là lựa chọn cân bằng giữa chất lượng ảnh và dung lượng lưu trữ, phù hợp với hầu hết các ứng dụng. Ảnh 1-bit chỉ có hai giá trị (đen và trắng) thường được sử dụng trong các bài toán nhị phân hóa. Ảnh 16-bit cung cấp độ chính xác cao hơn nhưng chiếm nhiều dung lượng hơn.

---

# 32. NỘI SUY ẢNH

Khi thay đổi kích thước hoặc biến đổi hình học, ta thường cần ước lượng giá trị tại vị trí mới – những vị trí không trùng với pixel gốc. Quá trình này được gọi là **Interpolation – Nội suy**.

Ba phương pháp phổ biến:

### Nearest Neighbor

Phương pháp này chọn giá trị của pixel gần nhất với vị trí mới. Ưu điểm là nhanh và đơn giản, nhưng nhược điểm là có thể tạo ra hiện tượng răng cưa (aliasing) và các khối vuông (blocky artifacts) khi phóng to ảnh.

* Nhanh.
* Đơn giản.
* Có thể tạo răng cưa.

### Bilinear

Phương pháp này sử dụng trung bình có trọng số của bốn pixel lân cận gần nhất. Kết quả mượt hơn so với nearest neighbor, nhưng có thể làm mờ chi tiết.

* Sử dụng các pixel lân cận.
* Kết quả mượt hơn.

### Bicubic

Phương pháp này sử dụng mười sáu pixel lân cận để tính toán giá trị mới. Kết quả thường mượt và giữ chi tiết tốt hơn so với bilinear, nhưng chậm hơn.

* Sử dụng nhiều điểm lân cận hơn.
* Kết quả thường mượt và giữ chi tiết tốt hơn.

Việc lựa chọn phương pháp nội suy phụ thuộc vào yêu cầu cụ thể của bài toán – cân bằng giữa chất lượng, tốc độ và tài nguyên tính toán.

---
<!--_class: section-->

# Biểu diễn và các quan hệ trong ảnh

---
# 33. ẢNH NHƯ MỘT MA TRẬN

Một ảnh xám có thể biểu diễn dưới dạng ma trận:

$$
I\in R^{M\times N}
$$

Trong đó $M$ là số hàng và $N$ là số cột của ảnh. Mỗi phần tử của ma trận tương ứng với một pixel.

Ví dụ:

```text
        x →
      0   1   2   3
    ┌───┬───┬───┬───┐
 y 0│12 │30 │45 │70 │
 ↓  ├───┼───┼───┼───┤
   1│18 │42 │80 │100│
    ├───┼───┼───┼───┤
   2│25 │60 │110│150│
    └───┴───┴───┴───┘
```

### Đây là nền tảng để sử dụng NumPy.

Cách biểu diễn này cho phép chúng ta áp dụng tất cả các phép toán ma trận để xử lý ảnh. Ví dụ, cộng hai ảnh tương đương với cộng hai ma trận, nhân ảnh với một hệ số tương đương với nhân ma trận với một số vô hướng. NumPy – thư viện tính toán số học phổ biến trong Python – cung cấp các công cụ mạnh mẽ để làm việc với ma trận, và do đó là công cụ lý tưởng để xử lý ảnh.

---

# 34. LÁNG GIỀNG CỦA PIXEL

Với pixel \(p(x,y)\), các pixel lân cận được định nghĩa như sau:

### 4-láng giềng

$$
N_4(p)=
\{(x-1,y),(x+1,y),(x,y-1),(x,y+1)\}
$$

Đây là bốn pixel nằm ngay bên trên, bên dưới, bên trái và bên phải của pixel $p$. Chúng tạo thành một cấu trúc hình chữ thập.

### Láng giềng chéo

Gồm bốn pixel nằm theo đường chéo so với pixel $p$: trên-trái, trên-phải, dưới-trái, dưới-phải.

### 8-láng giềng

Kết hợp:

> **4-láng giềng + láng giềng chéo**

Tổng cộng có tám pixel lân cận, tạo thành một hình vuông 3×3 xung quanh pixel $p$. Khái niệm láng giềng là nền tảng cho nhiều thuật toán xử lý ảnh như lọc, phát hiện biên, morphology và phân vùng.

---

# 35. TÍNH KỀ VÀ LIÊN THÔNG

Các pixel có thể được xem là kề nhau dựa trên nhiều tiêu chí khác nhau:

* 4-connectivity – hai pixel được coi là kề nếu chúng là 4-láng giềng của nhau.
* 8-connectivity – hai pixel được coi là kề nếu chúng là 8-láng giềng của nhau.
* m-connectivity – một dạng kết nối hỗn hợp, kết hợp 4-connectivity và 8-connectivity để tránh một số vấn đề nhập nhằng.

### Tại sao cần?

Các khái niệm này cần thiết để xác định:

* Pixel nào thuộc cùng một đối tượng – dựa trên tính liên thông.
* Đường đi giữa các pixel – chuỗi các pixel kề nhau.
* Một vùng ảnh gồm những pixel nào – tập hợp các pixel liên thông.

Tính liên thông là nền tảng cho các thuật toán phân vùng ảnh, phân tích thành phần liên thông và nhiều ứng dụng khác.

---

# 36. ĐƯỜNG ĐI VÀ VÙNG

### Path – Đường đi

Một đường đi là một chuỗi các pixel liên tiếp thỏa mãn điều kiện kề nhau. Đường đi có thể được sử dụng để mô tả mối quan hệ giữa các pixel trong ảnh.

### Region – Vùng

Một vùng là một tập các pixel **liên thông** – tức là tất cả các pixel trong vùng đều có thể kết nối với nhau thông qua các pixel khác trong vùng.

### Boundary – Biên

Biên của một vùng là tập các pixel thuộc vùng nhưng có ít nhất một láng giềng nằm ngoài vùng.

```text
████████
██    ██
██    ██
████████
```

Trong ví dụ trên, các pixel ở viền ngoài của hình vuông tạo thành boundary – phần bao quanh.

Các khái niệm này rất quan trọng trong phân tích ảnh, vì chúng cho phép chúng ta xác định và mô tả các đối tượng trong ảnh.

---

# 37. KHOẢNG CÁCH GIỮA CÁC PIXEL

Có nhiều cách định nghĩa khoảng cách giữa hai pixel $p(x,y)$ và $q(s,t)$. Ba khoảng cách phổ biến nhất là:

### Euclidean

$$
D_E(p,q)=
\sqrt{(x-s)^2+(y-t)^2}
$$

Đây là khoảng cách theo đường thẳng – khoảng cách "chim bay" giữa hai điểm. Đây là cách đo khoảng cách tự nhiên nhất nhưng cũng tốn kém tính toán nhất do có phép khai căn.

### City-block

$$
D_4(p,q)=|x-s|+|y-t|
$$

Còn được gọi là khoảng cách Manhattan. Đây là tổng khoảng cách theo chiều ngang và chiều dọc – giống như khoảng cách di chuyển trong thành phố với các đường phố vuông góc.

### Chessboard

$$
D_8(p,q)=
\max(|x-s|,|y-t|)
$$

Đây là khoảng cách theo đường chéo – giống như khoảng cách di chuyển của quân vua trong cờ vua, có thể di chuyển theo bất kỳ hướng nào.

---

# 38. SO SÁNH CÁC KHOẢNG CÁCH

Ba loại khoảng cách tạo ra các hình dạng khác nhau khi vẽ tập hợp các điểm cách đều một điểm gốc:

```text
Euclidean
    ○

City-block
    ◇

Chessboard
    □
```

Euclidean tạo ra hình tròn, city-block tạo ra hình thoi, chessboard tạo ra hình vuông.

### Ý nghĩa

Cách định nghĩa khoảng cách phụ thuộc vào:

> **mô hình láng giềng và bài toán cần giải.**

Các khái niệm này sẽ được sử dụng trong:

* Segmentation – phân vùng ảnh.
* Morphology – hình thái học.
* Connected components – thành phần liên thông.
* Feature extraction – trích xuất đặc trưng.

Việc lựa chọn khoảng cách phù hợp ảnh hưởng đến kết quả của nhiều thuật toán xử lý ảnh.

---
<!--_class: section-->

# Các phép toán cơ bản trên ảnh

---

# 39. CÁC PHÉP TOÁN TRÊN ẢNH

Vì ảnh có thể biểu diễn dưới dạng ma trận nên ta có thể thực hiện nhiều phép toán khác nhau:

### Arithmetic

* Addition – cộng ảnh.
* Subtraction – trừ ảnh.
* Multiplication – nhân ảnh.
* Division – chia ảnh.

### Logical

* AND – phép giao.
* OR – phép hợp.
* NOT – phép phủ định.
* XOR – phép hoặc loại trừ.

Các phép toán có thể thực hiện:

> **theo từng pixel – element-wise.**

Điều này có nghĩa là phép toán được áp dụng độc lập cho từng cặp pixel tương ứng giữa hai ảnh. Kết quả là một ảnh mới với giá trị pixel được tính từ giá trị của các pixel đầu vào.

---

# 40. CỘNG ẢNH – IMAGE AVERAGING

Giả sử có nhiều ảnh của cùng một cảnh, mỗi ảnh bị ảnh hưởng bởi nhiễu:

$$
g_k(x,y)=f(x,y)+n_k(x,y)
$$

Trong đó $f(x,y)$ là ảnh gốc và $n_k(x,y)$ là nhiễu trong ảnh thứ $k$. Nếu ta lấy trung bình cộng của $K$ ảnh:

$$
\bar g(x,y)=
\frac{1}{K}\sum_{k=1}^{K}g_k(x,y)
$$

Khi nhiễu trong các ảnh là độc lập và có trung bình bằng 0, phương sai của nhiễu trong ảnh trung bình là:

$$
\sigma_{\bar n}^2=
\frac{\sigma_n^2}{K}
$$

### Kết luận

> Tăng số lượng ảnh trung bình → giảm ảnh hưởng của nhiễu.

Công thức này cho thấy nhiễu giảm theo tỷ lệ nghịch với số lượng ảnh được trung bình. Ví dụ, nếu trung bình 100 ảnh, nhiễu giảm đi 10 lần. Đây là nguyên lý cơ bản của nhiều kỹ thuật giảm nhiễu trong xử lý ảnh và thị giác máy tính.

---

# 41. TRỪ ẢNH

Phép trừ ảnh có thể được sử dụng để phát hiện sự thay đổi giữa hai ảnh:

### Phát hiện thay đổi

```text
Ảnh trước ─┐
           ├── Difference ──→ Vùng thay đổi
Ảnh sau  ──┘
```

Khi lấy ảnh sau trừ ảnh trước, những vùng không thay đổi sẽ có giá trị gần bằng 0, trong khi những vùng thay đổi sẽ có giá trị khác biệt rõ rệt. Điều này cho phép xác định các vùng thay đổi trong ảnh.

### Một số ứng dụng

* Background subtraction – tách nền, thường dùng trong giám sát video.
* Change detection – phát hiện thay đổi, dùng trong viễn thám.
* Phân tích chuyển động – theo dõi đối tượng di chuyển.
* So sánh ảnh – kiểm tra sự khác biệt giữa hai ảnh.

Phép trừ ảnh là một công cụ đơn giản nhưng mạnh mẽ, được sử dụng rộng rãi trong nhiều ứng dụng thực tế.

---

# 42. PHÉP TOÁN LOGIC VÀ MASK

Ảnh nhị phân hoặc **mask** thường được sử dụng để xác định vùng quan tâm (Region of Interest – ROI). Mask là một ảnh nhị phân trong đó giá trị 1 (hoặc 255) đánh dấu các pixel thuộc vùng quan tâm, và giá trị 0 đánh dấu các pixel không thuộc vùng quan tâm.

Ví dụ:

```text
Image
  AND
Mask
  ↓
ROI
```

Phép toán AND giữa ảnh gốc và mask sẽ giữ lại chỉ những pixel thuộc vùng quan tâm, trong khi các pixel khác bị loại bỏ (đặt về 0).

### ROI – Region of Interest

Chỉ xử lý vùng cần thiết thay vì toàn bộ ảnh.

Điều này giúp tiết kiệm tài nguyên tính toán và tập trung vào những vùng quan trọng. Mask có thể được tạo tự động bằng các thuật toán phân vùng, hoặc thủ công bằng cách vẽ lên ảnh.

---

# 43. PHÉP TOÁN KHÔNG GIAN

Trong phép toán không gian, giá trị đầu ra có thể phụ thuộc vào:

> **một pixel hoặc một vùng lân cận của pixel.**

### Single-pixel operation

Trong phép toán single-pixel, giá trị đầu ra chỉ phụ thuộc vào giá trị của pixel đầu vào:

$$
g(x,y)=T(f(x,y))
$$

Trong đó $T$ là một hàm biến đổi. Ví dụ:

* Negative – đảo ngược giá trị pixel.
* Brightness adjustment – điều chỉnh độ sáng.
* Threshold – nhị phân hóa.

### Neighborhood operation

Trong phép toán neighborhood, giá trị đầu ra phụ thuộc vào các pixel xung quanh:

Ví dụ:

* Blur – làm mờ.
* Sharpening – làm sắc nét.
* Edge detection – phát hiện biên.

Các phép toán neighborhood thường được thực hiện thông qua convolution với một kernel – một ma trận nhỏ xác định trọng số của các pixel lân cận.

---

# 44. CONVOLUTION – Ý TƯỞNG CỐT LÕI

Một trong những công cụ quan trọng nhất của xử lý ảnh là **kernel / filter**. Kernel là một ma trận nhỏ (thường 3×3, 5×5 hoặc 7×7) được sử dụng để biến đổi ảnh.

```text
      Kernel
     ┌───┬───┬───┐
     │   │   │   │
     ├───┼───┼───┤
     │   │ X │   │
     ├───┼───┼───┤
     │   │   │   │
     └───┴───┴───┘
            │
            ▼
       tính tổng có trọng số
            │
            ▼
        pixel đầu ra
```

Quá trình convolution di chuyển kernel qua từng pixel của ảnh, tại mỗi vị trí, tính tổng có trọng số của các pixel lân cận với các giá trị trong kernel. Kết quả là giá trị của pixel đầu ra.

Một dạng biểu diễn:

$$
g(x,y)=
\sum_m\sum_n
h(m,n)f(x-m,y-n)
$$

Trong đó:

* \(f\): ảnh đầu vào.
* \(h\): kernel.
* \(g\): ảnh đầu ra.

Convolution là nền tảng cho hầu hết các phép toán xử lý ảnh không gian, từ làm mờ, làm sắc nét đến phát hiện biên.

---

# 45. VÍ DỤ KERNEL

### Mean filter

$$
\frac{1}{9}
\begin{bmatrix}
1&1&1\\
1&1&1\\
1&1&1
\end{bmatrix}
$$

Mean filter là kernel làm mượt đơn giản nhất. Nó lấy trung bình cộng của chín pixel trong vùng 3×3. Kết quả là ảnh bị làm mờ nhẹ, giảm nhiễu nhưng cũng làm mất chi tiết.

→ Làm mượt / giảm nhiễu.

### Edge filter

Một kernel có thể nhấn mạnh sự thay đổi cường độ:

$$
\begin{bmatrix}
-1&-1&-1\\
-1& 8&-1\\
-1&-1&-1
\end{bmatrix}
$$

Kernel này tính hiệu giữa pixel trung tâm và trung bình của tám pixel xung quanh. Nếu pixel trung tâm khác biệt nhiều so với các pixel xung quanh – tức là có sự thay đổi cường độ mạnh – kết quả sẽ lớn. Điều này giúp phát hiện các cạnh và đường viền trong ảnh.

→ Nhấn mạnh các vùng có thay đổi cường độ mạnh.

---

# 46. BIẾN ĐỔI HÌNH HỌC

Biến đổi hình học thay đổi **vị trí của pixel** trong ảnh. Các phép biến đổi phổ biến bao gồm:

* Translation – Tịnh tiến: dịch chuyển ảnh theo một vector.
* Rotation – Xoay: xoay ảnh quanh một tâm.
* Scaling – Co giãn: thay đổi kích thước ảnh.
* Shearing – Trượt: biến dạng ảnh theo một hướng.
* Perspective transformation – Biến đổi phối cảnh: thay đổi góc nhìn.

```text
Ảnh gốc
   ↓
Geometric Transformation
   ↓
Ảnh mới
   ↓
Interpolation
```

Sau khi biến đổi hình học, các pixel mới thường không trùng với pixel gốc, do đó cần sử dụng interpolation để ước lượng giá trị. Chất lượng của phép biến đổi phụ thuộc nhiều vào phương pháp interpolation được sử dụng.

---

# 47. THỐNG KÊ CƯỜNG ĐỘ

Cường độ pixel có thể được xem như một biến ngẫu nhiên, và các đại lượng thống kê có thể được sử dụng để mô tả đặc tính của ảnh.

### Mean

$$
\mu=
\frac{1}{N}\sum_{i=1}^{N}x_i
$$

Mean (giá trị trung bình) cho biết:

> **mức cường độ trung bình của ảnh.**

Giá trị mean cao thường cho thấy ảnh sáng, trong khi mean thấp cho thấy ảnh tối.

### Variance

$$
\sigma^2=
\frac{1}{N}
\sum_{i=1}^{N}(x_i-\mu)^2
$$

Variance (phương sai) cho biết mức độ phân tán của cường độ quanh giá trị trung bình.

→ Liên quan đến **độ tương phản**.

Phương sai cao cho thấy ảnh có độ tương phản cao – nhiều vùng sáng tối rõ rệt. Phương sai thấp cho thấy ảnh có độ tương phản thấp – ít sự khác biệt giữa các vùng.

---

# 48. HISTOGRAM

Histogram mô tả:

> **số lượng pixel tương ứng với từng mức cường độ.**

Ví dụ ảnh 8-bit:

```text
Số pixel
  │
  │       ███
  │   ███████
  │ ██████████
  │████████████
  └────────────────→
   0            255
       Intensity
```

Trong biểu đồ trên, trục hoành biểu thị mức cường độ từ 0 đến 255, trục tung biểu thị số lượng pixel có mức cường độ tương ứng.

Histogram giúp phân tích:

* Độ sáng – histogram lệch về bên phải cho thấy ảnh sáng, lệch về bên trái cho thấy ảnh tối.
* Độ tương phản – histogram trải rộng cho thấy độ tương phản cao, tập trung cho thấy độ tương phản thấp.
* Phân bố cường độ – hình dạng của histogram cho biết đặc tính phân bố của ảnh.

Histogram là công cụ quan trọng trong xử lý ảnh, được sử dụng trong nhiều kỹ thuật như cân bằng histogram, khớp histogram và phân ngưỡng.

---
<!--_class: section-->

# Công cụ xử lý ảnh trong Python

---
# 49. HỆ SINH THÁI PYTHON

Python được sử dụng rộng rãi trong Image Processing và Computer Vision nhờ:

* Cú pháp đơn giản – dễ học, dễ đọc, dễ viết.
* Hệ sinh thái thư viện phong phú – nhiều thư viện mạnh mẽ cho xử lý ảnh.
* Tích hợp tốt với Machine Learning / Deep Learning – thuận lợi cho các ứng dụng AI.
* Hỗ trợ nghiên cứu và triển khai ứng dụng – từ prototype đến production.

### Các thư viện chính

```text
                 Python
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
    NumPy        OpenCV      scikit-image
       │            │            │
       └────────────┼────────────┘
                    ▼
              Image Processing
```

NumPy cung cấp nền tảng tính toán ma trận. OpenCV cung cấp các thuật toán xử lý ảnh và thị giác máy tính. scikit-image cung cấp các thuật toán xử lý ảnh khoa học. Sự kết hợp của các thư viện này tạo nên một hệ sinh thái mạnh mẽ cho xử lý ảnh bằng Python.

---

# 50. NUMPY – NỀN TẢNG DỮ LIỆU

NumPy cung cấp:

* Mảng đa chiều – cấu trúc dữ liệu cơ bản để biểu diễn ảnh.
* Phép toán vector / ma trận – tính toán hiệu quả trên toàn bộ mảng.
* Các hàm toán học – sin, cos, exp, log, và nhiều hàm khác.
* Boolean masking – lọc dữ liệu dựa trên điều kiện.
* Slicing – truy cập và thao tác trên các phần của mảng.

### Biểu diễn ảnh

Ảnh xám:

$$
H\times W
$$

Ảnh màu RGB:

$$
H\times W\times3
$$

Ví dụ:

```python
image.shape
```

có thể cho:

```text
(480, 640, 3)
```

Điều này có nghĩa là ảnh có 480 hàng, 640 cột và 3 kênh màu (R, G, B). NumPy cho phép truy cập và thao tác trên từng pixel, từng vùng hoặc toàn bộ ảnh một cách hiệu quả.

---

# 51. OPENCV

**OpenCV – Open Source Computer Vision Library**

OpenCV là thư viện mã nguồn mở được sử dụng rộng rãi cho:

* Image Processing – xử lý ảnh.
* Computer Vision – thị giác máy tính.
* Video processing – xử lý video.
* Real-time applications – ứng dụng thời gian thực.
* AI model inference – suy luận mô hình AI.

### Một số chức năng

OpenCV cung cấp một loạt các chức năng mạnh mẽ:

* Đọc / ghi ảnh – đọc và lưu ảnh ở nhiều định dạng.
* Resize / rotate / flip – thay đổi kích thước, xoay, lật ảnh.
* Color conversion – chuyển đổi không gian màu.
* Filtering – lọc ảnh.
* Edge detection – phát hiện biên.
* Thresholding – phân ngưỡng.
* Morphology – hình thái học.
* Contours – tìm và vẽ đường viền.
* Object detection – phát hiện đối tượng.
* Video processing – xử lý video.

OpenCV là công cụ không thể thiếu trong hầu hết các dự án xử lý ảnh và thị giác máy tính.

---

# 52. OPENCV – CÁC HÀM CƠ BẢN

### Đọc / ghi

```python
cv2.imread()
cv2.imwrite()
```

`cv2.imread()` đọc ảnh từ file, `cv2.imwrite()` ghi ảnh ra file.

### Biến đổi

```python
cv2.resize()
cv2.flip()
cv2.rotate()
cv2.cvtColor()
```

Các hàm này cho phép thay đổi kích thước, lật, xoay và chuyển đổi không gian màu của ảnh.

### Vẽ

```python
cv2.line()
cv2.rectangle()
cv2.circle()
```

Các hàm này cho phép vẽ đường thẳng, hình chữ nhật, hình tròn lên ảnh – hữu ích cho việc đánh dấu và chú thích.

### Hiển thị

```python
cv2.imshow()
cv2.waitKey()
```

`cv2.imshow()` hiển thị ảnh trong cửa sổ, `cv2.waitKey()` chờ người dùng nhấn phím.

---

# 53. OPENCV – FILTERING & ENHANCEMENT

### Làm mờ / giảm nhiễu

```python
cv2.blur()
cv2.medianBlur()
cv2.bilateralFilter()
```

`cv2.blur()` thực hiện mean filter. `cv2.medianBlur()` thực hiện median filter – đặc biệt hiệu quả với salt-and-pepper noise. `cv2.bilateralFilter()` thực hiện bilateral filter – làm mờ nhưng giữ biên.

### Phát hiện biên

```python
cv2.Canny()
```

`cv2.Canny()` là thuật toán phát hiện biên phổ biến và hiệu quả.

### Thresholding

```python
cv2.threshold()
cv2.adaptiveThreshold()
```

Các hàm này chuyển ảnh xám thành ảnh nhị phân dựa trên ngưỡng.

### Morphology

```python
cv2.erode()
cv2.dilate()
```

Erosion và dilation là hai phép toán hình thái học cơ bản, thường được sử dụng để loại bỏ nhiễu và làm nổi bật cấu trúc.

### Contours

```python
cv2.findContours()
cv2.drawContours()
```

Tìm và vẽ đường viền của các đối tượng trong ảnh nhị phân.

---

# 54. CÁC THƯ VIỆN KHÁC

### Pillow

Pillow là thư viện xử lý ảnh cơ bản, phù hợp với:

* Đọc / ghi ảnh – hỗ trợ nhiều định dạng ảnh.
* Chuyển đổi định dạng – chuyển đổi giữa các định dạng ảnh.
* Các thao tác ảnh cơ bản – cắt, dán, xoay, thay đổi kích thước.
* Ứng dụng web và xử lý ảnh đơn giản – nhẹ và dễ sử dụng.

### scikit-image

scikit-image là thư viện xử lý ảnh khoa học, phù hợp với:

* Giáo dục – cung cấp nhiều ví dụ và tài liệu.
* Nghiên cứu – triển khai nhiều thuật toán tiên tiến.
* Các thuật toán xử lý ảnh khoa học – segmentation, restoration, feature extraction.
* Segmentation, restoration, feature extraction...

### Mahotas

Mahotas tập trung vào:

* Image processing – xử lý ảnh.
* Morphology – hình thái học.
* Một số thao tác xử lý ảnh hiệu năng cao.

---

# 55. NÊN DÙNG THƯ VIỆN NÀO?

| Thư viện         | Điểm mạnh                          |
| ---------------- | ---------------------------------- |
| **NumPy**        | Ma trận và tính toán số            |
| **OpenCV**       | Image Processing & Computer Vision |
| **Pillow**       | Thao tác ảnh cơ bản                |
| **scikit-image** | Thuật toán nghiên cứu              |
| **Matplotlib**   | Hiển thị và trực quan hóa          |

### Trong học phần

> **NumPy + OpenCV + Matplotlib** sẽ là bộ công cụ chính.

NumPy cung cấp nền tảng dữ liệu, OpenCV cung cấp các thuật toán xử lý ảnh, Matplotlib cung cấp khả năng hiển thị. Sự kết hợp này đủ mạnh mẽ để giải quyết hầu hết các bài toán xử lý ảnh cơ bản và trung bình.

Các thư viện khác được sử dụng khi phù hợp – ví dụ, Pillow cho các thao tác ảnh đơn giản, scikit-image cho các thuật toán nghiên cứu.

---
<!--_class: section-->

# Môi trường thực hành

---

# 56. MÔI TRƯỜNG THỰC HÀNH

### Phần mềm

Để thực hành xử lý ảnh bằng Python, sinh viên cần cài đặt:

* Python **3.11+** – phiên bản Python mới nhất.
* VS Code – môi trường phát triển tích hợp.
* Jupyter Notebook – môi trường tương tác cho phân tích dữ liệu.

### VS Code Extensions

* Python – hỗ trợ ngôn ngữ Python.
* Jupyter – hỗ trợ notebook trong VS Code.

### Python packages

Các gói Python cần cài đặt:

```text
numpy
opencv-python
matplotlib
scikit-image
pillow
ipykernel
```

### Lưu ý

**SciPy không bắt buộc để sử dụng OpenCV.**

SciPy chỉ cần khi bài toán sử dụng các chức năng khoa học / tính toán số phù hợp của thư viện này. OpenCV có thể hoạt động độc lập mà không cần SciPy.

---

# 57. TỔ CHỨC PROJECT

Một project xử lý ảnh nên được tổ chức một cách khoa học để dễ quản lý và phát triển:

```text
projects/
│
├── images/
│   └── input images
│
├── output/
│   └── processed images
│
├── notebooks/
│   └── *.ipynb
│
├── src/
│   └── Python source code
│
└── pyproject.toml
```

### Nguyên tắc

```text
images/
   ↓
Input
   ↓
Processing
   ↓
output/
```

Không ghi đè dữ liệu đầu vào trong quá trình thực hành nếu không cần thiết. Điều này đảm bảo rằng dữ liệu gốc luôn được giữ nguyên, cho phép thực hiện lại các thí nghiệm và so sánh kết quả.

---

# 58. MINI WORKFLOW ĐẦU TIÊN

Một pipeline xử lý ảnh đơn giản:

```text
          input.jpg
              │
              ▼
        Read Image
              │
              ▼
           Resize
              │
              ▼
       Convert to Gray
              │
              ▼
            Blur
              │
              ▼
      Edge Detection
              │
              ▼
        Save Result
              │
              ▼
         output.jpg
```

Pipeline này bao gồm các bước cơ bản: đọc ảnh, thay đổi kích thước, chuyển sang ảnh xám, làm mờ, phát hiện biên và lưu kết quả. Đây là một ví dụ điển hình về quy trình xử lý ảnh từ đầu vào đến đầu ra.

### Đây chính là cầu nối

> **Kiến thức Chương 1 → Thực hành Python**

---

# 59. VÍ DỤ PYTHON ĐẦU TIÊN

```python
import cv2
import matplotlib.pyplot as plt

image = cv2.imread("images/input.jpg")

gray = cv2.cvtColor(
    image,
    cv2.COLOR_BGR2GRAY
)

edges = cv2.Canny(
    gray,
    100,
    200
)

plt.imshow(edges, cmap="gray")
plt.axis("off")
plt.show()
```

### Pipeline

```text
Image
  ↓
Grayscale
  ↓
Canny
  ↓
Edges
```

Đoạn code trên thực hiện pipeline: đọc ảnh, chuyển sang ảnh xám, phát hiện biên bằng Canny và hiển thị kết quả. Đây là ví dụ đầu tiên giúp sinh viên làm quen với OpenCV và Matplotlib trong xử lý ảnh.

---

# 60. TỔNG KẾT CHƯƠNG

Sau chương này, cần nắm được:

### 1. Khái niệm

* Image – ảnh.
* Digital Image – ảnh số.
* Pixel – phần tử ảnh.
* Image Processing – xử lý ảnh.
* Computer Vision – thị giác máy tính.

### 2. Hình thành ảnh

* Light – ánh sáng.
* Sensor – cảm biến.
* Image acquisition – thu nhận ảnh.
* Illumination / Reflectance – chiếu sáng / phản xạ.

### 3. Số hóa

* Sampling – lấy mẫu.
* Quantization – lượng tử hóa.
* Spatial resolution – độ phân giải không gian.
* Intensity resolution – độ phân giải cường độ.
* Interpolation – nội suy.

---

# 61. TỔNG KẾT – BIỂU DIỄN ẢNH

```text
Digital Image
     │
     ├── Pixel
     │
     ├── Matrix
     │
     ├── Neighborhood
     │
     ├── Connectivity
     │
     ├── Region / Boundary
     │
     └── Distance
```

### Các khái niệm này là nền tảng cho:

* Filtering – lọc ảnh.
* Segmentation – phân vùng.
* Morphology – hình thái học.
* Feature extraction – trích xuất đặc trưng.
* Computer Vision – thị giác máy tính.

Những khái niệm này sẽ được sử dụng xuyên suốt học phần và trong nhiều ứng dụng thực tế.

---

# 62. TỔNG KẾT – TOÀN BỘ HỆ THỐNG

```text
THẾ GIỚI THỰC
      │
      ▼
ÁNH SÁNG / TÍN HIỆU
      │
      ▼
CẢM BIẾN
      │
      ▼
     ẢNH
      │
      ▼
   SỐ HÓA
      │
      ▼
  PIXEL / MATRIX
      │
      ▼
IMAGE PROCESSING
      │
      ▼
COMPUTER VISION
      │
      ▼
THÔNG TIN / QUYẾT ĐỊNH
```

Sơ đồ này tóm tắt toàn bộ quá trình từ thế giới thực đến quyết định, nhấn mạnh vai trò của từng bước trong hệ thống.

---

# 63. CÂU HỎI ÔN TẬP

1. Ảnh số khác ảnh liên tục như thế nào?
2. Pixel là gì?
3. Sampling và quantization khác nhau như thế nào?
4. Spatial resolution và intensity resolution là gì?
5. 4-neighborhood và 8-neighborhood khác nhau như thế nào?
6. Euclidean, City-block và Chessboard distance khác nhau như thế nào?
7. Image Processing và Computer Vision có quan hệ như thế nào?
8. Convolution được sử dụng để làm gì?
9. Histogram biểu diễn thông tin gì?
10. NumPy và OpenCV có vai trò gì trong xử lý ảnh bằng Python?

---

# 64. BÀI TẬP THỰC HÀNH

### Bài 1 – Khám phá ảnh số

* Đọc một ảnh bằng OpenCV.
* Hiển thị ảnh.
* In kích thước ảnh.
* In số kênh màu.
* Truy cập một pixel.

### Bài 2 – Biến đổi ảnh

Thực hiện:

* Resize.
* Flip.
* Rotate.
* Grayscale.

### Bài 3 – Pixel operations

Thực hiện:

* Brightness adjustment.
* Negative image.
* Image addition.
* Image subtraction.

---

# 65. BÀI TẬP THỰC HÀNH – FILTERING

Với một ảnh có nhiễu:

1. Áp dụng Mean filter.
2. Áp dụng Median filter.
3. Áp dụng Gaussian filter.
4. So sánh kết quả.
5. Nhận xét ảnh hưởng đến biên.

### Câu hỏi

> Tại sao Median filter thường phù hợp với **salt-and-pepper noise**?

Median filter thay thế giá trị của mỗi pixel bằng median (trung vị) của các pixel lân cận. Với salt-and-pepper noise – nhiễu xuất hiện dưới dạng các điểm trắng hoặc đen ngẫu nhiên – median filter có thể loại bỏ các điểm nhiễu này mà không làm mờ biên, vì median không bị ảnh hưởng bởi các giá trị cực đoan.

---

# 66. BÀI TẬP THỰC HÀNH – EDGE

Pipeline:

```text
Original
   ↓
Grayscale
   ↓
Gaussian Blur
   ↓
Canny
   ↓
Edge Image
```

Sinh viên thay đổi tham số Canny và quan sát:

* Số lượng biên.
* Biên yếu / mạnh.
* Nhiễu.

Canny có hai tham số ngưỡng: ngưỡng thấp và ngưỡng cao. Thay đổi các ngưỡng này ảnh hưởng đến số lượng biên được phát hiện. Ngưỡng thấp hơn phát hiện nhiều biên hơn nhưng cũng có thể phát hiện nhiễu. Ngưỡng cao hơn chỉ phát hiện các biên mạnh nhưng có thể bỏ sót một số biên.

---

# 67. CHUẨN BỊ CHO CHƯƠNG 2

## CHƯƠNG 2 – BIẾN ĐỔI ẢNH

Từ nền tảng:

```text
Pixel
  ↓
Image as Matrix
  ↓
Image Operations
```

chúng ta sẽ đi sâu vào:

* Point transformation – biến đổi điểm.
* Histogram processing – xử lý histogram.
* Spatial transformation – biến đổi không gian.
* Frequency-domain transformation – biến đổi miền tần số.
* Các kỹ thuật biến đổi ảnh.

### Câu hỏi dẫn nhập

> **Có thể biến đổi một ảnh như thế nào để làm nổi bật thông tin mà chúng ta quan tâm?**

---

# 68. THÔNG ĐIỆP CỐT LÕI

> ### Máy tính không nhìn thấy "con mèo".
>
> Nó nhận được **dữ liệu số**.
>
> Nhiệm vụ của Image Processing và Computer Vision là biến dữ liệu đó thành:
>
> **đặc trưng → thông tin → hiểu biết → quyết định.**

Thông điệp này tóm tắt triết lý của toàn bộ học phần: máy tính không có khả năng nhận thức trực quan như con người, nhưng thông qua các thuật toán và mô hình, chúng ta có thể giúp máy tính "hiểu" được nội dung của ảnh.

---

# 69. KẾT THÚC CHƯƠNG 1

## TỪ PIXEL ĐẾN COMPUTER VISION

```text
Pixel
  ↓
Image
  ↓
Processing
  ↓
Features
  ↓
Objects
  ↓
Understanding
```

### Chương 1 cung cấp nền tảng.

### Các chương tiếp theo sẽ trả lời:

> **Làm thế nào để xử lý và biến đổi ảnh hiệu quả?**

---