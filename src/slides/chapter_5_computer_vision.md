# CHƯƠNG 5
# THỊ GIÁC MÁY TÍNH

**Học phần:** Xử lý ảnh & Thị giác máy tính

### Mục tiêu
- Hiểu bài toán và pipeline Computer Vision.
- Nắm các kỹ thuật CV kinh điển: điểm, đường, biên, thresholding, region, clustering, superpixels.
- Biết dùng **OpenCV** ngay trong từng kỹ thuật.
- Hiểu vai trò và cách ứng dụng **mô hình AI** trong CV.

---

# 1. BỨC TRANH TỔNG QUAN

## Computer Vision là gì?

Computer Vision (CV) là lĩnh vực giúp máy tính **trích xuất thông tin có ý nghĩa từ ảnh/video** để nhận biết, đo lường, suy luận hoặc hành động.

**Input**
- Ảnh tĩnh
- Chuỗi video / frame
- Camera thời gian thực
- Dữ liệu từ drone, điện thoại, CCTV...

**Output**
- Nhãn
- Vị trí / bounding box
- Mask theo pixel
- Keypoints
- Text / số liệu
- Quyết định

> Tư duy cốt lõi: **pixel → cấu trúc → đối tượng → thông tin → quyết định**

---

# 2. PIPELINE CỦA MỘT HỆ THỐNG CV

![Pipeline CV](assets/cv_pipeline.svg)

### Bốn lớp tư duy

1. **Tiền xử lý:** resize, đổi màu, khử nhiễu, chuẩn hóa.
2. **Trích xuất đặc trưng:** biên, góc, texture, keypoint hoặc đặc trưng sâu.
3. **Nhận thức:** phân loại, phát hiện, phân đoạn, OCR, pose...
4. **Quyết định:** đo, cảnh báo, điều khiển, tìm kiếm hoặc hỗ trợ người dùng.

**OpenCV** thường xuất hiện mạnh ở hai lớp đầu và có thể đảm nhiệm cả một số bước nhận thức / suy luận qua `cv2.dnn`.

---

# 3. XỬ LÝ ẢNH VS COMPUTER VISION

| Xử lý ảnh | Computer Vision |
|---|---|
| Cải thiện hoặc biến đổi ảnh | Hiểu và suy luận từ ảnh |
| Lọc nhiễu, tăng tương phản | Phân loại, detection, segmentation |
| Threshold, morphology | Object / scene understanding |
| Thường là bước tiền xử lý | Có thể dùng kết quả của xử lý ảnh |

### Mối quan hệ

**Image Processing → tạo dữ liệu/biểu diễn tốt hơn → Computer Vision → tạo thông tin có nghĩa**

Không nên xem hai lĩnh vực là hai hệ thống hoàn toàn tách biệt.

---

# 4. CÁC BÀI TOÁN CV CỐT LÕI

![Các bài toán CV](assets/cv_tasks.svg)

### Classification
Ảnh thuộc lớp nào?

### Detection
Có những đối tượng nào và chúng nằm ở đâu?

### Segmentation
Pixel nào thuộc đối tượng / lớp nào?

### Các bài toán khác
- Keypoint / pose estimation
- OCR
- Tracking
- 3D reconstruction
- Depth estimation

---

# 5. ĐIỂM ĐẶC TRƯNG — KEYPOINTS

Keypoint là những vị trí **có cấu trúc cục bộ nổi bật**, ví dụ:
- góc
- giao điểm
- vùng có biến đổi cường độ mạnh
- điểm có mô tả cục bộ ổn định

Một hệ thống feature thường gồm:

**Detection → Description → Matching**

### Vì sao cần keypoint?

Hai ảnh chụp cùng cảnh có thể khác:
- vị trí
- scale
- rotation
- một phần bị che khuất
- ánh sáng

Keypoint + descriptor giúp tìm ra **những phần tương ứng**.

---

# 6. ORB VỚI OPENCV

ORB là lựa chọn thực dụng khi cần feature nhanh và không phụ thuộc SIFT.

```python
import cv2

orb = cv2.ORB_create(nfeatures=500)

keypoints, descriptors = \
    orb.detectAndCompute(gray, None)

result = cv2.drawKeypoints(
    image, keypoints, None,
    flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS
)
```

### Ý nghĩa API

- `detectAndCompute()` tìm keypoint và tạo descriptor.
- `nfeatures` giới hạn số điểm.
- Descriptor của ORB phù hợp với khoảng cách Hamming.

**Mini-demo:** thay đổi `nfeatures` và quan sát số điểm được phát hiện.

---

# 7. MATCHING FEATURES

Sau khi có descriptor của hai ảnh:

1. Chọn bộ so khớp.
2. Tính khoảng cách descriptor.
3. Xếp hạng các cặp match.
4. Lọc các match kém.

Với ORB, một lựa chọn phổ biến:

```python
bf = cv2.BFMatcher(
    cv2.NORM_HAMMING,
    crossCheck=True
)

matches = bf.match(desc1, desc2)
matches = sorted(matches, key=lambda m: m.distance)
```

**Distance nhỏ hơn → descriptor giống nhau hơn.**

---

# 8. ỨNG DỤNG: GHÉP ẢNH PANORAMA

![Stitching](assets/stitching.svg)

### Pipeline

**Keypoint → Descriptor → Matching → Homography → Warp → Stitch**

Homography là phép biến đổi phối cảnh mô tả quan hệ giữa hai mặt phẳng ảnh khi các điểm tương ứng thuộc cùng một mặt phẳng xấp xỉ.

### Vai trò RANSAC

Match có thể chứa **outlier**. RANSAC tìm mô hình hình học phù hợp với đa số inlier thay vì tin vào mọi match.

---

# 9. PHÁT HIỆN ĐƯỜNG VÀ BIÊN

### Đường (line)
Một cấu trúc kéo dài có thể được mô hình hóa bằng tham số hình học.

### Biên (edge)
Vùng mà cường độ ảnh thay đổi mạnh.

Biên thường xuất hiện tại:
- ranh giới vật thể
- cạnh chữ
- đường giao nhau
- thay đổi mạnh về texture / độ sáng

**Biên không phải bản thân đối tượng** — nó là một tín hiệu giúp suy ra cấu trúc đối tượng.

---

# 10. GRADIENT VÀ Ý TƯỞNG CANNY

Biên có thể được phát hiện từ gradient của ảnh.

### Pipeline Canny

![Canny pipeline](assets/edge_pipeline.svg)

1. Chuyển ảnh xám.
2. Gaussian blur để giảm nhiễu.
3. Tính gradient.
4. Non-maximum suppression.
5. Double threshold.
6. Edge tracking by hysteresis.

### OpenCV

```python
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
blur = cv2.GaussianBlur(gray, (5, 5), 0)
edges = cv2.Canny(blur, 50, 150)
```

**Thực hành:** thay đổi hai ngưỡng Canny và quan sát số lượng biên.

---

# 11. HOUGH TRANSFORM — TỪ BIÊN ĐẾN ĐƯỜNG

Sau khi có ảnh biên, ta có thể tìm các đường thẳng bằng Hough Transform.

Ý tưởng:

**Nhiều điểm ảnh cùng ủng hộ một đường → một vùng tích lũy nổi bật trong không gian tham số.**

OpenCV:

```python
lines = cv2.HoughLinesP(
    edges,
    1,
    np.pi / 180,
    threshold=50,
    minLineLength=50,
    maxLineGap=10
)
```

### Ứng dụng
- phát hiện lane
- cấu trúc hình học
- đo đạc
- phát hiện cạnh thẳng của vật thể

---

# 12. THRESHOLDING — TÁCH ĐỐI TƯỢNG KHỎI NỀN

Thresholding biến ảnh mức xám thành mask dựa trên một ngưỡng.

\[
g(x,y)=
\begin{cases}
1 & f(x,y)>T\\
0 & \text{ngược lại}
\end{cases}
\]

### OpenCV

```python
_, binary = cv2.threshold(
    gray, 127, 255,
    cv2.THRESH_BINARY
)
```

### Khi nào hiệu quả?

Khi foreground và background có mức sáng tương đối tách biệt.

**Điểm yếu:** một ngưỡng cố định có thể thất bại khi ánh sáng không đồng đều.

---

# 13. GLOBAL VS ADAPTIVE THRESHOLD

### Global threshold
Một `T` cho toàn ảnh.

### Adaptive threshold
Ngưỡng thay đổi theo vùng lân cận.

```python
binary = cv2.adaptiveThreshold(
    gray, 255,
    cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv2.THRESH_BINARY,
    11, 2
)
```

### So sánh

| Global | Adaptive |
|---|---|
| Đơn giản, nhanh | Thích nghi ánh sáng cục bộ |
| Tốt khi ánh sáng đồng đều | Tốt khi nền/ánh sáng thay đổi |
| Dễ chọn tham số | Nhiều tham số hơn |

---

# 14. OTSU — TỰ ĐỘNG CHỌN NGƯỠNG

Otsu tìm ngưỡng làm cho **độ phân tán trong mỗi lớp nhỏ** hoặc tương đương tối ưu hóa sự phân tách giữa hai lớp.

```python
T, binary = cv2.threshold(
    gray, 0, 255,
    cv2.THRESH_BINARY + cv2.THRESH_OTSU
)
```

### Ý nghĩa

Không cần tự chọn `T = 127`.

### Nhưng cần nhớ

Otsu phù hợp nhất khi histogram có khả năng phân tách foreground/background tương đối rõ; nó không phải giải pháp cho mọi điều kiện ánh sáng.

---

# 15. MORPHOLOGY — LÀM SẠCH MASK

Sau thresholding, mask có thể chứa:
- lỗ nhỏ
- điểm nhiễu
- vùng bị đứt
- vật thể dính nhau

Các phép hình thái cơ bản:

**Erosion → co vùng sáng**

**Dilation → nở vùng sáng**

Từ đó tạo:

- **Opening = erosion → dilation:** loại nhiễu nhỏ.
- **Closing = dilation → erosion:** lấp khe / nối vùng gần nhau.

---

# 16. MORPHOLOGY VỚI OPENCV

```python
kernel = np.ones((3, 3), np.uint8)

opened = cv2.morphologyEx(
    binary, cv2.MORPH_OPEN, kernel
)

closed = cv2.morphologyEx(
    binary, cv2.MORPH_CLOSE, kernel
)
```

### Tư duy chọn phép toán

- Mask có **đốm nhiễu nhỏ** → thử Opening.
- Mask có **khe nhỏ / lỗ nhỏ** → thử Closing.
- Muốn làm đối tượng nhỏ đi → Erosion.
- Muốn mở rộng vùng → Dilation.

---

# 17. REGION-BASED SEGMENTATION

Thay vì chỉ xét từng pixel, ta xét **vùng có tính chất tương đồng**.

Một vùng có thể được xác định bởi:
- mức xám
- màu
- texture
- khoảng cách không gian
- đặc trưng kết hợp

### Hai chiến lược quan trọng

**Region growing:** bắt đầu từ seed và mở rộng.

**Split & merge:** chia vùng lớn thành các vùng đồng nhất rồi hợp nhất các vùng phù hợp.

---

# 18. REGION GROWING

### Ý tưởng

1. Chọn một hoặc nhiều **seed**.
2. Xét các pixel lân cận.
3. Nếu pixel đủ giống vùng hiện tại → thêm vào vùng.
4. Tiếp tục cho đến khi không thể mở rộng.

Pseudo-code:

```text
Region = {seed}

while còn pixel lân cận:
    chọn pixel p
    nếu similarity(p, Region) > threshold:
        thêm p vào Region
```

### Vấn đề

Kết quả phụ thuộc:
- vị trí seed
- tiêu chí similarity
- threshold
- nhiễu

---

# 19. REGION GROWING VỚI OPENCV

OpenCV không cung cấp một hàm `regionGrowing()` chuẩn duy nhất cho mọi biến thể.

Một cách tiếp cận thực tế là xây dựng thuật toán bằng:
- NumPy
- queue / stack
- mask
- phép kiểm tra lân cận

**Bài học quan trọng:** thư viện không phải lúc nào cũng có sẵn đúng abstraction của bài toán; đôi khi ta kết hợp các primitive để tạo thuật toán.

---

# 20. SPLIT & MERGE

### Split

Nếu vùng hiện tại **không đồng nhất**:
→ chia thành các vùng nhỏ hơn.

### Merge

Nếu hai vùng kề nhau **đủ giống nhau**:
→ hợp nhất.

Có thể hình dung:

**Ảnh → vùng lớn → split → vùng nhỏ → merge có điều kiện → vùng cuối**

### Điểm mạnh
Tạo segmentation dựa trên tính đồng nhất của vùng.

### Hạn chế
Chi phí tính toán và tiêu chí đồng nhất ảnh hưởng mạnh đến kết quả.

---

# 21. CONNECTED COMPONENTS

Khi đã có binary mask, Connected Components giúp xác định các thành phần liên thông.

```python
num_labels, labels, stats, centroids = \
    cv2.connectedComponentsWithStats(binary)
```

Mỗi component có thể cung cấp:
- bounding box
- diện tích
- centroid

### Đây là cầu nối quan trọng

**Segmentation cổ điển → object candidates → đo / đếm / lọc**

Ví dụ: đếm vật thể trên băng chuyền sau khi threshold.

---

# 22. CONTOUR — BIÊN CỦA VÙNG

Contour biểu diễn đường bao của vùng foreground.

```python
contours, hierarchy = cv2.findContours(
    binary,
    cv2.RETR_EXTERNAL,
    cv2.CHAIN_APPROX_SIMPLE
)
```

Từ contour có thể tính:
- diện tích
- chu vi
- bounding rectangle
- convex hull
- moments
- shape descriptors

### Ứng dụng

**Mask → contour → đặc trưng hình học → quyết định**

---

# 23. PHÂN CỤM CHO SEGMENTATION

Khi chưa có nhãn, ta có thể nhóm pixel / feature thành các cluster.

Ví dụ:
- K-means
- Gaussian Mixture Model
- clustering trên màu + vị trí

### K-means

Mục tiêu:

\[
\min \sum_i \|x_i-\mu_{c_i}\|^2
\]

Trong đó:
- \(x_i\): feature của pixel
- \(c_i\): cluster
- \(\mu\): tâm cluster

---

# 24. K-MEANS VỚI OPENCV

```python
Z = np.float32(img.reshape((-1, 3)))

criteria = (
    cv2.TERM_CRITERIA_EPS +
    cv2.TERM_CRITERIA_MAX_ITER,
    20, 1.0
)

K = 3
_, labels, centers = cv2.kmeans(
    Z, K, None, criteria, 10,
    cv2.KMEANS_PP_CENTERS
)
```

### Diễn giải

- Chuyển ảnh thành danh sách vector màu.
- Chọn `K` cluster.
- Tìm tâm cụm.
- Gán mỗi pixel vào tâm gần nhất.

**Lưu ý:** K-means không "hiểu" vật thể; nó chỉ tối ưu tiêu chí khoảng cách trong không gian feature.

---

# 25. SUPERPIXELS

Thay vì xử lý từng pixel độc lập, superpixel nhóm các pixel lân cận có đặc tính tương tự thành **các vùng nhỏ, có ý nghĩa hơn về mặt cấu trúc**.

### Trực giác

Pixel → rất nhiều đơn vị nhỏ

Superpixel → ít vùng hơn → giảm độ phức tạp cho bước xử lý sau.

### Một thuật toán tiêu biểu

**SLIC — Simple Linear Iterative Clustering**

OpenCV có thể hỗ trợ superpixel thông qua module `ximgproc` tùy cách cài đặt.

---

# 26. SLIC — Ý TƯỞNG

SLIC thường kết hợp:
- màu
- vị trí không gian

Do đó hai pixel chỉ giống màu nhưng ở rất xa nhau không nhất thiết được gom chung.

### Pipeline

**Ảnh → feature màu + tọa độ → clustering có ràng buộc không gian → superpixels**

### Ứng dụng

- tiền xử lý segmentation
- giảm số phần tử
- tạo region proposals
- phân tích texture / màu

---

# 27. SO SÁNH CÁC CÁCH SEGMENTATION CỔ ĐIỂN

| Phương pháp | Ý tưởng | Điểm mạnh | Hạn chế |
|---|---|---|---|
| Threshold | phân theo giá trị | rất đơn giản | nhạy ánh sáng |
| Region growing | mở rộng từ seed | giữ tính liên thông | phụ thuộc seed |
| Split & merge | chia/hợp vùng | biểu diễn vùng rõ | phức tạp hơn |
| K-means | gom feature | dễ triển khai | cần chọn K |
| Superpixel | gom pixel lân cận | giảm độ phức tạp | vẫn cần bước sau |

### Quy tắc thực hành

**Chọn phương pháp theo cấu trúc dữ liệu**, không chọn chỉ vì thuật toán "mới" hay "mạnh".

---

# 28. TỪ CV CỔ ĐIỂN ĐẾN AI

### Giai đoạn cổ điển
Con người thiết kế đặc trưng:
- SIFT
- HOG
- LBP
- Haar-like features

### Machine Learning
Đặc trưng thủ công → classifier:
- SVM
- Random Forest
- AdaBoost

### Deep Learning
Mạng học trực tiếp biểu diễn từ dữ liệu:
- CNN
- Transformer

**Chuyển dịch quan trọng:** từ *feature engineering* sang *representation learning*.

---

# 29. OPENCV — KHÔNG CHỈ LÀ IMAGE PROCESSING

OpenCV có thể đóng vai trò ở nhiều tầng:

### `imgcodecs`
Đọc / ghi ảnh.

### `imgproc`
Resize, filtering, threshold, morphology, contour...

### `features2d`
Keypoint, descriptor, matching.

### `objdetect`
Một số bộ phát hiện cổ điển.

### `dnn`
Đọc và chạy một số mô hình deep learning.

> OpenCV thường là **công cụ xử lý + tích hợp pipeline**, còn mô hình AI chịu trách nhiệm học biểu diễn / dự đoán trong các hệ thống hiện đại.

---

# 30. OPENCV DNN — CẦU NỐI SANG AI

![DNN pipeline](assets/dnn_pipeline.svg)

Một pipeline suy luận:

1. Đọc model.
2. Chuẩn bị input.
3. Tạo blob.
4. `setInput()`.
5. `forward()`.
6. Hậu xử lý.
7. NMS / threshold.
8. Vẽ hoặc trả kết quả.

Ví dụ:

```python
blob = cv2.dnn.blobFromImage(
    img, 1/255.0, (640, 640),
    swapRB=True, crop=False
)
net.setInput(blob)
outputs = net.forward()
```

---

# 31. ỨNG DỤNG MÔ HÌNH AI TRONG THỊ GIÁC MÁY TÍNH

## PHẦN RIÊNG

Từ đây tập trung vào **mô hình AI**, kiến trúc, bài toán phù hợp, cách chọn model và chiến lược triển khai.

### Ba bài toán nền tảng

- Classification
- Detection
- Segmentation

Sau đó mở rộng sang:
- OCR
- Pose
- Foundation models
- Vision Transformers
- Transfer Learning
- Edge AI

---

# 32. MÔ HÌNH AI LÀ GÌ?

Mô hình AI là một hàm được học từ dữ liệu để ánh xạ input → output.

**Training**

Dữ liệu → học tham số → mô hình

**Inference**

Ảnh mới → mô hình → dự đoán

### Ví dụ

Ảnh mèo / chó có nhãn
→ mô hình học biểu diễn
→ ảnh mới
→ xác suất các lớp
→ nhãn dự đoán.

---

# 33. CLASSIFICATION — RESNET

**Input:** một ảnh.

**Output:** một nhãn hoặc phân phối xác suất trên các lớp.

### ResNet

Ý tưởng nổi bật: **Residual / Skip Connection**

\[
y = F(x)+x
\]

Thay vì bắt mạng học trực tiếp một biến đổi phức tạp, đường tắt giúp truyền thông tin và gradient qua các lớp sâu.

### Ứng dụng

- phân loại sản phẩm
- phân loại bệnh ảnh
- nhận dạng loại phương tiện
- phân loại cảnh

---

# 34. ALEXNET — BƯỚC NGOẶT 2012

AlexNet là một cột mốc quan trọng của Computer Vision hiện đại.

Các ý tưởng đáng chú ý:
- CNN sâu hơn các mô hình trước đó.
- ReLU.
- Dropout.
- Huấn luyện trên GPU.
- Thành công lớn trên ImageNet.

### Ý nghĩa

Không chỉ là "một model", AlexNet góp phần chứng minh rằng **deep learning + dữ liệu lớn + GPU** có thể vượt trội các pipeline feature thủ công trong image classification.

---

# 35. VGG — KIẾN TRÚC ĐƠN GIẢN, SÂU

VGG nổi bật với việc sử dụng nhiều convolution nhỏ, thường là kernel 3×3, xếp chồng thành mạng sâu.

### Ưu điểm
- Kiến trúc dễ hiểu.
- Dễ dùng để minh họa CNN.
- Tạo nền tảng cho nhiều nghiên cứu transfer learning.

### Nhược điểm
- Rất nhiều tham số.
- Nặng về bộ nhớ và tính toán.

**Bài học:** sâu hơn không tự động đồng nghĩa với hiệu quả hơn.

---

# 36. EFFICIENTNET — CÂN BẰNG QUY MÔ

EfficientNet đề xuất **compound scaling**:

- depth: độ sâu
- width: độ rộng
- resolution: độ phân giải

Thay vì chỉ tăng một chiều, mô hình mở rộng có kiểm soát cả ba.

### Giá trị thực tế

Khi tài nguyên hạn chế, câu hỏi không chỉ là:

> "Model nào chính xác nhất?"

mà còn là:

> "Model nào đạt trade-off tốt giữa accuracy, latency, memory và energy?"

---

# 37. MOBILENET — AI TRÊN THIẾT BỊ BIÊN

MobileNet được thiết kế cho môi trường tài nguyên hạn chế.

### Ý tưởng quan trọng

**Depthwise separable convolution**

Tách convolution thông thường thành các phép tính nhỏ hơn để giảm chi phí.

### Ứng dụng

- điện thoại
- camera
- IoT
- Edge AI
- thiết bị nhúng

### Bài học

**Model deployment là bài toán hệ thống**, không chỉ là chọn kiến trúc có accuracy cao.

---

# 38. OBJECT DETECTION — YOLO

YOLO giải quyết:

**Ảnh → nhiều object + class + bounding box + confidence**

Ý tưởng nổi bật:

> Thực hiện detection trong một pipeline suy luận thống nhất, hướng tới tốc độ cao.

### Ứng dụng
- giao thông
- camera an ninh
- đếm người
- kiểm kê
- robot

### Khi đánh giá detection

Không chỉ nhìn confidence.

Cần quan tâm:
- Precision / Recall
- IoU
- mAP
- latency / FPS

---

# 39. FASTER R-CNN — TWO-STAGE DETECTION

Pipeline:

**Ảnh → Region Proposal Network → vùng đề xuất → classifier + box regression**

### Đặc điểm

- Two-stage.
- Có thể đạt độ chính xác cao.
- Thường phức tạp hơn các detector ưu tiên real-time.

### So sánh tư duy

**YOLO:** ưu tiên pipeline detection nhanh, thống nhất.

**Faster R-CNN:** tách rõ bước đề xuất vùng và nhận dạng.

Không có model "tốt nhất" cho mọi ứng dụng.

---

# 40. INSTANCE SEGMENTATION — MASK R-CNN

Mask R-CNN mở rộng Faster R-CNN bằng thêm nhánh dự đoán **mask cho từng instance**.

Một object có:

- class
- bounding box
- mask

### Ví dụ

Nếu ảnh có 5 người:

Semantic segmentation:
> tất cả pixel người → lớp "person"

Instance segmentation:
> người A, người B, ..., người E → các mask riêng.

### Ứng dụng

- đếm từng vật thể
- robot grasping
- ảnh y tế
- phân tích đối tượng chồng lấp

---

# 41. U-NET — SEGMENTATION CHO ẢNH Y TẾ

U-Net có kiến trúc hình chữ U:

**Encoder → bottleneck → Decoder**

Skip connections nối đặc trưng ở encoder với decoder.

### Tại sao cần skip connection?

Encoder giảm kích thước để lấy ngữ cảnh.

Decoder tăng kích thước để tạo mask.

Skip connection giúp giữ **thông tin không gian chi tiết** đã có ở các tầng sớm.

### Ứng dụng
- tế bào
- khối u
- mạch máu
- cấu trúc giải phẫu

---

# 42. VISION TRANSFORMER — VIT

ViT đưa ảnh vào Transformer bằng cách:

**Ảnh → patch → embedding → Transformer → prediction**

Ví dụ ảnh được chia thành các patch 16×16.

### Khác CNN

CNN có inductive bias mạnh về tính cục bộ và cấu trúc không gian.

Transformer sử dụng cơ chế attention để mô hình hóa quan hệ giữa các token/patch.

### Hệ quả

Transformer mở rộng mạnh từ classification sang:
- detection
- segmentation
- multimodal vision

---

# 43. OCR — TỪ ẢNH ĐẾN VĂN BẢN

OCR là quá trình nhận dạng ký tự từ ảnh.

### Pipeline

**Image → preprocessing → text/line detection → recognition → text**

Các mô hình hiện đại có thể học end-to-end tốt hơn pipeline template matching cổ điển.

### Mô hình tiêu biểu

- CRNN + CTC
- TrOCR

### Ứng dụng

- số hóa tài liệu
- hóa đơn
- biển số
- biểu mẫu

---

# 44. POSE ESTIMATION

Pose estimation tìm các **keypoints cơ thể**.

Ví dụ:
- đầu
- vai
- khuỷu tay
- cổ tay
- hông
- đầu gối
- cổ chân

### Output

Tập tọa độ keypoint + confidence.

### Ứng dụng

- phân tích thể thao
- AR
- game
- giám sát tư thế
- tương tác người–máy

OpenPose là một ví dụ tiêu biểu của hướng tiếp cận này.

---

# 45. FOUNDATION MODELS CHO VISION

Các mô hình mới có xu hướng dùng một model nền có thể thích nghi cho nhiều nhiệm vụ.

### Ví dụ

**SAM**
- segmentation theo prompt.

**CLIP**
- liên kết biểu diễn ảnh và văn bản.

### Thay đổi tư duy

Từ:

> "Mỗi bài toán → một model chuyên biệt"

sang:

> "Một model nền → nhiều nhiệm vụ / prompt / downstream task"

---

# 46. TRANSFER LEARNING — CHIẾN LƯỢC THỰC TẾ

![Transfer Learning](assets/transfer_learning.svg)

Huấn luyện từ đầu thường cần:
- rất nhiều dữ liệu
- thời gian
- GPU
- chi phí gán nhãn

### Transfer Learning

1. Chọn model pretrained.
2. Thay head phù hợp bài toán.
3. Freeze một phần backbone nếu cần.
4. Huấn luyện head.
5. Fine-tune một phần hoặc toàn bộ khi dữ liệu đủ.

### Với dự án sinh viên

**Pretrained + fine-tuning** thường là điểm bắt đầu hợp lý hơn training from scratch.

---

# 47. CHỌN MODEL THEO BÀI TOÁN

| Bài toán | Điểm bắt đầu hợp lý |
|---|---|
| Classification | ResNet / EfficientNet / MobileNet |
| Real-time detection | YOLO family |
| Detection ưu tiên accuracy | Faster R-CNN / detector hiện đại |
| Segmentation | U-Net / các kiến trúc segmentation hiện đại |
| Instance segmentation | Mask R-CNN |
| OCR | TrOCR / pipeline OCR chuyên dụng |
| Pose | OpenPose và các pose model hiện đại |
| Vision-language | CLIP và vision-language models |
| General segmentation | SAM và các biến thể |

### Quy tắc

**Bài toán → constraints → metric → model**

Không làm ngược lại:

**Model đang hot → tìm bài toán để áp vào.**

---

# 48. XÂY DỰNG MỘT HỆ THỐNG CV/AI

### Bước 1 — Xác định bài toán
Ví dụ: phát hiện sản phẩm lỗi.

### Bước 2 — Dữ liệu
Thu thập đủ các điều kiện thực tế.

### Bước 3 — Gán nhãn
Classification / box / mask tùy bài toán.

### Bước 4 — Baseline
Bắt đầu bằng pipeline đơn giản hoặc pretrained model.

### Bước 5 — Huấn luyện / fine-tune

### Bước 6 — Đánh giá

### Bước 7 — Triển khai và giám sát

---

# 49. ĐÁNH GIÁ HỆ THỐNG

### Classification
- Accuracy
- Precision
- Recall
- F1
- Confusion matrix

### Detection
- IoU
- Precision / Recall
- mAP
- latency / FPS

### Segmentation
- IoU / Jaccard
- Dice
- pixel accuracy

### Hệ thống thực tế

Ngoài accuracy còn phải đo:
- latency
- memory
- energy
- throughput
- robustness

---

# 50. DATASET VÀ DATA SHIFT

Model có thể tốt trên validation nhưng kém ngoài thực tế.

Ví dụ:
- train ban ngày → triển khai ban đêm
- camera A → camera B
- ảnh sạch → ảnh rung / mờ
- góc nhìn thay đổi
- môi trường thay đổi

Đây là **distribution shift / domain shift**.

### Bài học

Không chỉ hỏi:

> "Model đạt bao nhiêu %?"

Mà phải hỏi:

> "Model có hoạt động ổn định trong điều kiện sử dụng thật không?"

---

# 51. EDGE AI

Khi model chạy ngay trên thiết bị:

**Camera → inference tại edge → kết quả**

thay vì:

**Camera → cloud → inference → trả kết quả**

### Ưu điểm

- latency thấp
- giảm truyền dữ liệu
- có thể hoạt động khi mạng yếu
- hỗ trợ riêng tư tốt hơn trong một số trường hợp

### Công nghệ triển khai

- ONNX
- TensorRT
- OpenVINO
- TFLite / LiteRT
- runtime tối ưu cho thiết bị

---

# 52. VAI TRÒ CỦA OPENCV TRONG HỆ THỐNG HIỆN ĐẠI

OpenCV có thể đứng **trước, giữa và sau model**:

### Trước model
- đọc camera
- resize
- color conversion
- denoise
- crop / ROI

### Trong pipeline
- tracking
- geometric transform
- feature matching
- một số inference qua `cv2.dnn`

### Sau model
- vẽ box/mask
- NMS hoặc hậu xử lý
- đo lường
- hiển thị
- ghi video

> AI model không thay thế OpenCV; hai lớp thường **bổ sung cho nhau**.

---

# 53. MỘT PIPELINE THỰC TẾ

### Ví dụ: camera phát hiện người

**Camera**

↓

**OpenCV**
- capture
- resize
- color conversion

↓

**YOLO**
- detection

↓

**Post-processing**
- confidence threshold
- NMS
- tracking nếu cần

↓

**Business logic**
- đếm người
- cảnh báo
- lưu sự kiện

### Đây mới là "hệ thống CV"

Không nên đồng nhất **model = toàn bộ hệ thống**.

---

# 54. SO SÁNH: CỔ ĐIỂN HAY AI?

| Điều kiện | Classical CV | AI / Deep Learning |
|---|---|---|
| Ít dữ liệu | ✓ | có thể khó |
| Quy tắc rõ ràng | ✓ | thường không cần |
| Môi trường ổn định | ✓ | ✓ |
| Biến thiên lớn | hạn chế | ✓ |
| Nhận dạng ngữ nghĩa | hạn chế | ✓ |
| Tài nguyên rất thấp | thường thuận lợi | cần tối ưu |
| Cần dữ liệu gán nhãn | ít / không | thường nhiều |

### Kết luận

**Hybrid pipeline** thường là lựa chọn thực tế.

---

# 55. CASE STUDY — KIỂM TRA SẢN PHẨM

### Cách 1: Classical CV

Ảnh
→ grayscale
→ threshold
→ morphology
→ contour
→ đo diện tích
→ rule

### Cách 2: AI

Ảnh
→ pretrained model
→ classification / detection / segmentation
→ quyết định

### Cách 3: Hybrid

OpenCV:
- chuẩn hóa ảnh
- ROI
- geometric correction

AI:
- nhận dạng lỗi

OpenCV:
- đo kích thước
- hậu xử lý

**Bài học:** chọn kiến trúc theo problem, không theo "sở thích công nghệ".

---

# 56. MINI PROJECT GỢI Ý

## Bài toán: đếm vật thể trong ảnh/video

### Mức 1 — Classical
- threshold
- morphology
- connected components
- contour

### Mức 2 — Feature
- ORB
- matching
- tracking đơn giản

### Mức 3 — AI
- YOLO
- confidence threshold
- NMS
- đếm detection

### Mức 4 — Hybrid
- OpenCV preprocessing
- AI detection
- OpenCV tracking / visualization
- thống kê theo thời gian

---

# 57. CÂU HỎI KIỂM TRA TƯ DUY

1. Khi nào thresholding tốt hơn deep learning?
2. Vì sao Canny thường đi sau Gaussian blur?
3. ORB descriptor khác keypoint ở điểm nào?
4. Vì sao panorama cần Homography?
5. Connected Components khác Contour ở đâu?
6. K-means có thực sự "hiểu" object không?
7. Classification khác Detection như thế nào?
8. Semantic segmentation khác Instance segmentation?
9. Vì sao Transfer Learning phù hợp dự án ít dữ liệu?
10. Tại sao model accuracy cao chưa chắc triển khai tốt?

---

# 58. TỔNG KẾT CHƯƠNG

### Nhóm 1 — CV kinh điển
**Keypoint → Edge → Threshold → Region → Clustering → Superpixel**

### Nhóm 2 — OpenCV
OpenCV cung cấp các primitive để xây dựng pipeline CV từ đọc ảnh đến xử lý, feature, hình học, visualization và một phần inference.

### Nhóm 3 — AI
**Classification → Detection → Segmentation → OCR → Pose → Foundation Models**

### Nhóm 4 — Engineering
**Data → Model → Evaluation → Deployment → Monitoring**

---

# 59. THÔNG ĐIỆP CUỐI CHƯƠNG

> **Computer Vision không phải chỉ là "nhận diện ảnh".**

Một hệ thống CV hoàn chỉnh phải trả lời:

**Nhìn thấy gì?**

→ **Ở đâu?**

→ **Hình dạng / cấu trúc thế nào?**

→ **Có ý nghĩa gì?**

→ **Độ tin cậy bao nhiêu?**

→ **Hệ thống phải làm gì tiếp theo?**

### Tư duy quan trọng nhất

**Problem → Representation → Algorithm/Model → Evaluation → Deployment**

---

# 60. KẾT THÚC

## CHƯƠNG 5 — THỊ GIÁC MÁY TÍNH

**Image Processing**
→ **Classical Computer Vision**
→ **OpenCV**
→ **Deep Learning**
→ **AI Vision Systems**

### Bài tiếp theo
Từ nền tảng CV, chuyển sang xây dựng pipeline / ứng dụng thực tế với dữ liệu và mô hình AI.
