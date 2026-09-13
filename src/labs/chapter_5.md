# Bài tập thực hành chương 5

## Bài 1: Đặc trưng ảnh đơn giản — Histogram màu

**Mục tiêu:** Hiểu cách xây dựng **feature vector** từ ảnh (bước đệm cho phân loại ảnh).

**Yêu cầu:**
1. Tải ảnh `data.astronaut()`.
2. Cắt ra 3 vùng: mặt người, nền xanh (sky), bộ đồ (clothing).
3. Tính **histogram màu 3D** (kênh R, G, B) cho mỗi vùng với `bins=8/kênh`, chuyển về vector 1D và chuẩn hóa.
4. Vẽ histogram R, G, B riêng cho từng vùng.
5. So sánh: dùng `np.linalg.norm` để tính khoảng cách giữa các feature vector.
6. Hiển thị 3 vùng + histogram; lưu kết quả vào `output/bai1_color_histogram.png`.

---

## Bài 2: Phân loại ảnh với đặc trưng + k-NN/SVM

**Mục tiêu:** Áp dụng pipeline **trích xuất đặc trưng → huấn luyện → dự đoán** cho bài toán phân loại ảnh.

**Yêu cầu:**
1. Tự sinh **dataset tổng hợp** gồm 3 lớp hình học: **tròn**, **vuông**, **tam giác** (mỗi lớp 30 ảnh 64×64).
2. Trích xuất đặc trưng mỗi ảnh: `[area, perimeter, số đỉnh, circularity, aspect_ratio]` từ contour.
3. Chia train/test 80/20 (`stratify=y`).
4. Huấn luyện **k-NN** (k=3) và **SVM** (RBF).
5. In accuracy, confusion matrix, và dự đoán thử vài mẫu.
6. Lưu kết quả vào `output/bai2_classification.png`.

---

## Bài 3: Phát hiện khuôn mặt với Haar Cascade

**Mục tiêu:** Áp dụng **Haar Cascade** để phát hiện mặt người.

**Yêu cầu:**
1. Tải ảnh `data.astronaut()`.
2. Load `images/haarcascade_frontalface_default.xml` (đã tải ở Bước 2).
3. Kiểm tra `face_cascade.empty()` — nếu rỗng thì báo lỗi rõ ràng.
4. Phát hiện mặt với 2 cặp tham số khác nhau:
   - `scaleFactor=1.1, minNeighbors=5`
   - `scaleFactor=1.3, minNeighbors=3`
5. Vẽ bounding box lên ảnh gốc.
6. Hiển thị 3 ảnh (gốc + 2 kết quả); lưu vào `output/bai3_face_detect.png`.

---

## Bài 4: Phát hiện mắt và miệng

**Mục tiêu:** Kết hợp nhiều cascade để phát hiện chi tiết khuôn mặt.

**Yêu cầu:**
1. Tải ảnh `data.astronaut()`, chuyển xám.
2. Load 3 cascade: mặt, mắt, mỉm cười (từ `images/`).
3. Tiền xử lý ảnh bằng **CLAHE** để tăng tương phản vùng tối.
4. Phát hiện mặt trước, sau đó **chỉ tìm mắt/miệng trong vùng mặt** (tăng tốc + giảm false positive).
5. Nếu không phát hiện được miệng bằng smile cascade, **dùng fallback hình học** (giả định miệng ở vùng 2/3 dưới khuôn mặt).
6. Vẽ bounding box màu khác nhau cho mặt / mắt / miệng.
7. Hiển thị và lưu vào `output/bai4_face_parts.png`.

---

## Bài 5: Phát hiện điểm đặc trưng với ORB

**Mục tiêu:** Hiểu khái niệm **keypoint + descriptor** trong CV.

**Yêu cầu:**
1. Tải ảnh `data.astronaut()`, chuyển xám.
2. Tạo ORB detector với `nfeatures=200`.
3. Phát hiện keypoint + descriptor.
4. Vẽ keypoint lên ảnh (dùng `cv2.drawKeypoints`).
5. So sánh số keypoint với `nfeatures ∈ {50, 100, 500}`.
6. In shape của descriptor array.
7. Hiển thị 3 kết quả + ảnh gốc; lưu vào `output/bai5_orb.png`.

---

## Bài 6: Ghép ảnh panorama với ORB + BFMatcher

**Mục tiêu:** Áp dụng keypoint + descriptor để **ghép 2 ảnh** (image stitching).

**Yêu cầu:**
1. Tạo 2 ảnh overlap bằng cách cắt từ `data.astronaut()` với offset khác nhau (ví dụ offset=150).
2. Phát hiện ORB keypoint trên cả 2 ảnh (`nfeatures=1000`).
3. Match descriptor bằng `BFMatcher` + `crossCheck=True`.
4. Lọc match tốt bằng cách sort theo khoảng cách (top-N).
5. Tính `Homography` bằng `cv2.findHomography` (RANSAC).
6. Warp và ghép 2 ảnh lại.
7. Hiển thị 2 ảnh gốc + top-50 match + kết quả ghép; lưu vào `output/bai6_stitch.png`.

---

## Bài 7: Template Matching — Phát hiện đối tượng theo mẫu

**Mục tiêu:** Phát hiện đối tượng trong ảnh bằng cách tìm mẫu khớp.

**Yêu cầu:**
1. Tải ảnh `data.coins()`.
2. Cắt một đồng xu làm **template**.
3. Áp dụng `cv2.matchTemplate` với 3 phương pháp:
   - `TM_CCOEFF_NORMED`
   - `TM_CCORR_NORMED`
   - `TM_SQDIFF_NORMED`
4. Tìm vị trí khớp tốt nhất bằng `cv2.minMaxLoc`. **Lưu ý:** với `TM_SQDIFF_NORMED`, giá trị **nhỏ** là tốt; với 2 cái còn lại, giá trị **lớn** là tốt.
5. Vẽ bounding box kết quả.
6. Hiển thị ảnh gốc, template và 3 kết quả; lưu vào `output/bai7_template.png`.

---

## Bài 8: Đếm đối tượng trong ảnh

**Mục tiêu:** Pipeline **tiền xử lý → phân đoạn → contour → đếm** (một ứng dụng CV cổ điển).

**Yêu cầu:**
1. Tải ảnh `data.coins()`.
2. Pipeline:
   - Làm mịn Gaussian.
   - Otsu threshold.
   - Morphology (mở + đóng).
   - `findContours`.
   - Lọc theo diện tích (loại bỏ nhiễu nhỏ, ngưỡng 200 px²).
3. Vẽ contour + gán số thứ tự cho từng đối tượng.
4. In số đồng xu đếm được.
5. Lưu kết quả vào `output/bai8_counting.png`.

---

## Bài 9: Đo lường kích thước đối tượng

**Mục tiêu:** Từ contour, đo diện tích, chu vi và ước lượng đường kính đối tượng.

**Yêu cầu:**
1. Tải ảnh `data.coins()`. Giả định tỷ lệ: 1 pixel ≈ 0.1 mm.
2. Tìm contour (như Bài 8).
3. Với mỗi đối tượng, tính:
   - Diện tích (pixel²)
   - Chu vi (pixel)
   - **Đường kính tương đương** (từ diện tích: `d = 2·√(A/π)`)
   - **Circularity** = `4πA / P²` (đo độ tròn: 1.0 = tròn hoàn hảo)
4. In bảng kết quả cho 5 đồng xu đầu.
5. Vẽ bounding box + chú thích đường kính (mm); lưu vào `output/bai9_measure.png`.

---

## Bài 10: Phân đoạn ngữ nghĩa đơn giản (Semantic Segmentation)

**Mục tiêu:** Gán nhãn **lớp** cho từng pixel dựa trên ngưỡng (minh họa semantic segmentation).

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Xác định 3 lớp pixel bằng ngưỡng thủ công:
   - **Tối** (nền): `I < 80`
   - **Trung bình** (da/áo): `80 ≤ I < 160`
   - **Sáng** (mặt/chi tiết): `I ≥ 160`
3. Tạo ảnh phân đoạn với **color map** (đen / xanh lá / vàng).
4. Overlay lên ảnh gốc với alpha = 0.4.
5. In **tỷ lệ pixel** của mỗi lớp.
6. Lưu kết quả vào `output/bai10_semantic.png`.

---

## Bài 11: Trích xuất đặc trưng HOG + SVM

**Mục tiêu:** Áp dụng **HOG (Histogram of Oriented Gradients)** + **SVM** cho phân loại ảnh.

**Yêu cầu:**
1. Sinh dataset tổng hợp gồm **đường ngang** và **đường dọc** (mỗi lớp 40 ảnh 64×64, có nhiễu nhẹ).
2. Trích xuất HOG descriptor cho mỗi ảnh (`orientations=9, pixels_per_cell=(8,8), cells_per_block=(2,2)`).
3. Huấn luyện SVM (linear kernel) trên feature HOG.
4. Đánh giá accuracy trên tập test 20%.
5. Trực quan hóa HOG của một mẫu mỗi lớp (dùng `visualize=True`).
6. Lưu kết quả vào `output/bai11_hog.png`.

---

## Bài 12: OCR đơn giản với Template Matching

**Mục tiêu:** Áp dụng template matching để đọc chữ số (minh họa OCR cổ điển).

**Yêu cầu:**
1. Sinh 10 ảnh chữ số `0-9` (dùng `cv2.putText`) làm **template**.
2. Sinh ảnh "biển số" tổng hợp chứa chuỗi số (ví dụ "2024") với kích thước khác.
3. Chia ảnh biển số thành 4 ô đều; với mỗi ô, resize về kích thước template và so khớp với 10 template, chọn template có score cao nhất.
4. Vẽ bounding box + nhãn dự đoán.
5. In chuỗi đọc được so với ground truth.
6. Lưu kết quả vào `output/bai12_ocr.png`.

---

## Bài 13: So sánh các bộ phát hiện keypoint — ORB vs SIFT

**Mục tiêu:** Hiểu sự khác biệt giữa các **feature detector** phổ biến.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Chạy 2 detector có sẵn trong `opencv-python`: `ORB` và `SIFT` (mỗi cái `nfeatures=500`).
3. Đo:
   - Số keypoint
   - Thời gian phát hiện (ms)
   - Kích thước descriptor (byte)
4. Vẽ keypoint trên ảnh (dùng `DRAW_RICH_KEYPOINTS`).
5. In bảng so sánh.
6. Lưu kết quả vào `output/bai13_detectors.png`.

---

## Bài 14: Pipeline CV hoàn chỉnh — Đếm và phân loại đối tượng

**Mục tiêu:** Tổng hợp toàn bộ Chương 1 → 5 vào một pipeline CV hoàn chỉnh.

**Yêu cầu:**
1. Tải ảnh `data.coins()`.
2. Pipeline:
   - **(Ch1)** Xem thông tin ảnh.
   - **(Ch2)** Làm mịn Gaussian.
   - **(Ch2)** Otsu threshold.
   - **(Ch4)** Morphology làm sạch + `findContours`.
   - **(Ch5)** Với mỗi contour, trích xuất đặc trưng: `[area, circularity, aspect]`.
   - **(Ch5)** Phân loại bằng rule-based (dùng percentile) thành 3 nhóm: **nhỏ**, **vừa**, **lớn**.
3. Vẽ contour theo màu tương ứng với từng nhóm.
4. In bảng tổng hợp số lượng mỗi nhóm.
5. Lưu kết quả vào `output/bai14_pipeline.png`.
