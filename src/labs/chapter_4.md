# Bài tập thực hành chương 4

## Bài 1: Phát hiện điểm biệt lập (Point Detection)

**Mục tiêu:** Cài đặt mặt nạ Laplacian 8-láng giềng và phát hiện điểm biệt lập bằng ngưỡng.

**Yêu cầu:**
1. Tạo một ảnh tổng hợp `300×300` nền xám 100, đặt 5–7 điểm sáng đơn lẻ (giá trị 255) ở các vị trí ngẫu nhiên.
2. Định nghĩa mặt nạ Laplacian:
   ```
   [-1 -1 -1]
   [-1  8 -1]
   [-1 -1 -1]
   ```
3. Tích chập ảnh với mặt nạ này (`cv2.filter2D`).
4. Áp dụng ngưỡng `|R| > T` (chọn `T = 200`) để xác định điểm biệt lập.
5. Hiển thị ảnh gốc, đáp ứng Laplacian (chuẩn hóa), và ảnh đã phát hiện điểm.
6. Lưu kết quả vào `output/bai1_point_detect.png`.

---

## Bài 2: Phát hiện đường (Line Detection)

**Mục tiêu:** Dùng 4 mặt nạ định hướng để phát hiện đường ngang, dọc, chéo ±45°.

**Yêu cầu:**
1. Tạo ảnh `300×300` nền đen, vẽ 4 đường trắng mảnh theo 4 hướng: ngang, dọc, chéo +45°, chéo −45°.
2. Định nghĩa 4 mặt nạ:
   - Ngang: `[[-1,-1,-1],[2,2,2],[-1,-1,-1]]`
   - Dọc: `[[-1,2,-1],[-1,2,-1],[-1,2,-1]]`
   - Chéo +45°: `[[-1,-1,2],[-1,2,-1],[2,-1,-1]]`
   - Chéo −45°: `[[2,-1,-1],[-1,2,-1],[-1,-1,2]]`
3. Tích chập từng mặt nạ với ảnh, ngưỡng `T = 200`.
4. Hiển thị 4 kết quả.
5. Lưu kết quả vào `output/bai2_line_detect.png`.

---

## Bài 3: So sánh toán tử Roberts, Prewitt, Sobel

**Mục tiêu:** Cài đặt thủ công 3 toán tử gradient và so sánh kết quả.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Cài đặt 3 cặp kernel:
   - **Roberts (2×2):** `Gx=[[1,0],[0,-1]]`, `Gy=[[0,1],[-1,0]]`
   - **Prewitt (3×3):** `Gx=[[-1,0,1],[-1,0,1],[-1,0,1]]`, `Gy=[[-1,-1,-1],[0,0,0],[1,1,1]]`
   - **Sobel (3×3):** `Gx=[[-1,0,1],[-2,0,2],[-1,0,1]]`, `Gy=[[-1,-2,-1],[0,0,0],[1,2,1]]`
3. Với mỗi phương pháp, tính `M = sqrt(Gx² + Gy²)` và chuẩn hóa.
4. Hiển thị 3 kết quả cạnh nhau.
5. Lưu kết quả vào `output/bai3_gradient_operators.png`.

---

## Bài 4: Phát hiện biên Canny

**Mục tiêu:** Áp dụng Canny và khảo sát ảnh hưởng của 2 ngưỡng.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Chạy Canny với các cặp ngưỡng:
   - `(50, 100)`, `(100, 200)`, `(150, 250)`, `(200, 300)`
3. Hiển thị 4 kết quả + ảnh gốc.
4. Nhận xét về ảnh hưởng của ngưỡng.
5. Lưu kết quả vào `output/bai4_canny.png`.

---

## Bài 5: LoG — Laplacian of Gaussian (Marr-Hildreth)

**Mục tiêu:** Cài đặt pipeline LoG: Gaussian → Laplacian → zero-crossing.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Làm mịn bằng Gaussian `σ=1.5, ksize=9×9`.
3. Tính Laplacian của ảnh đã làm mịn.
4. Tìm zero-crossing: pixel có dấu đổi so với láng giềng.
5. Hiển thị ảnh gốc, ảnh mịn, Laplacian (chuẩn hóa), và ảnh zero-crossing.
6. Lưu kết quả vào `output/bai5_log.png`.

> ⚠️ **Lưu ý:** Với OpenCV 5.0, khi ảnh đầu vào là `float32` thì `ddepth` phải là `cv2.CV_32F` (không dùng `CV_64F`).

---

## Bài 6: Kết hợp Gradient + Phân ngưỡng

**Mục tiêu:** Từ gradient Sobel, dùng ngưỡng để tạo ảnh biên nhị phân.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Tính `M(x, y)` từ Sobel.
3. Chuẩn hóa M về `[0, 255]`.
4. Phân ngưỡng với `T ∈ {30, 60, 100, 150}`.
5. Hiển thị 4 kết quả + M chuẩn hóa; lưu vào `output/bai6_gradient_threshold.png`.

---

## Bài 7: Phân ngưỡng toàn cục — Thủ công & Otsu

**Mục tiêu:** So sánh ngưỡng thủ công với Otsu tự động.

**Yêu cầu:**
1. Tải ảnh `data.coins()`.
2. Áp dụng `cv2.threshold` với ngưỡng thủ công `T=100`, `T=150`.
3. Áp dụng Otsu (`cv2.THRESH_OTSU`).
4. Hiển thị ảnh gốc + histogram có đánh dấu ngưỡng Otsu + các ảnh nhị phân.
5. Lưu kết quả vào `output/bai7_otsu.png`.

---

## Bài 8: Phân ngưỡng thích nghi (Adaptive Thresholding)

**Mục tiêu:** So sánh global vs adaptive trên ảnh có chiếu sáng không đều.

**Yêu cầu:**
1. Tải ảnh `data.page()`.
2. Áp dụng global Otsu + adaptive (`ADAPTIVE_THRESH_GAUSSIAN_C`, `blockSize=15, C=8`).
3. Thử thêm `blockSize=35`.
4. Hiển thị 4 ảnh; lưu vào `output/bai8_adaptive.png`.

---

## Bài 9: Đa ngưỡng (Multi-Otsu)

**Mục tiêu:** Áp dụng Multi-Otsu để phân đoạn ảnh thành nhiều lớp.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Áp dụng `threshold_multiotsu(img, classes=3)` và `classes=4`.
3. Phân đoạn ảnh theo các ngưỡng tìm được.
4. Hiển thị ảnh gốc + histogram có đánh dấu các ngưỡng + ảnh phân đoạn.
5. Lưu kết quả vào `output/bai9_multiotsu.png`.

---

## Bài 10: Phát triển vùng (Region Growing)

**Mục tiêu:** Cài đặt Region Growing từ seed point và ngưỡng sai khác.

**Yêu cầu:**
1. Tải ảnh `data.coins()`.
2. Cài đặt `region_growing(img, seed, threshold)`:
   - Dùng BFS (queue) duyệt 8-láng giềng.
   - Thêm pixel vào vùng nếu `|img[p] - seed_value| <= threshold`.
3. Áp dụng với các seed khác nhau và các threshold `{5, 15, 30}`.
4. Hiển thị ảnh gốc + vùng phát triển (mask) trên từng threshold.
5. Lưu kết quả vào `output/bai10_region_growing.png`.

---

## Bài 11: Chia tách và Hợp nhất vùng (Split & Merge)

**Mục tiêu:** Cài đặt Split & Merge dùng cây tứ phân (quadtree).

**Yêu cầu:**
1. Tải ảnh `data.camera()`, crop về kích thước `256×256`.
2. Cài đặt:
   - `split(img, x, y, size, threshold)`: nếu phương sai > ngưỡng → chia 4 phần.
   - `merge(blocks, threshold)`: gộp 2 khối kề nhau nếu mean giống nhau.
3. Áp dụng split với `threshold ∈ {50, 150}`.
4. Hiển thị ảnh gốc + kết quả split (tô màu theo block).
5. Lưu kết quả vào `output/bai11_split_merge.png`.

---

## Bài 12: Phân cụm K-Means cho phân đoạn ảnh

**Mục tiêu:** Áp dụng K-Means để phân đoạn ảnh màu.

**Yêu cầu:**
1. Tải ảnh `data.astronaut()`.
2. Chuyển sang `float32` và reshape thành `(N_pixels, 3)`.
3. Áp dụng `cv2.kmeans` với `K ∈ {2, 3, 5, 8}`.
4. Với mỗi K, hiển thị ảnh phân đoạn màu.
5. Lưu kết quả vào `output/bai12_kmeans.png`.

---

## Bài 13: Superpixel với SLIC

**Mục tiêu:** Tạo superpixel và khảo sát ảnh hưởng của `n_segments` và `compactness`.

**Yêu cầu:**
1. Tải ảnh `data.astronaut()`.
2. Áp dụng SLIC với các cặp:
   - `(n_segments=100, compactness=10)`
   - `(n_segments=100, compactness=30)`
   - `(n_segments=500, compactness=10)`
   - `(n_segments=500, compactness=30)`
3. Hiển thị 4 kết quả (dùng `mark_boundaries` để vẽ viền superpixel).
4. Lưu kết quả vào `output/bai13_slic.png`.

---

## Bài 14: Hough Transform — Phát hiện đường thẳng

**Mục tiêu:** Áp dụng Hough Transform để phát hiện đường thẳng từ ảnh biên.

**Yêu cầu:**
1. Tạo ảnh `300×300` có 3 đường thẳng rõ ràng (ngang, dọc, chéo).
2. Phát hiện biên Canny.
3. Áp dụng `cv2.HoughLines` (Hough chuẩn) và `cv2.HoughLinesP` (xác suất).
4. Vẽ các đường phát hiện được lên ảnh gốc.
5. Hiển thị ảnh gốc, ảnh biên, kết quả Hough chuẩn, kết quả HoughLinesP.
6. Lưu kết quả vào `output/bai14_hough.png`.

> ⚠️ **Lưu ý:** Với OpenCV 5.0, output của `HoughLines` có shape `(N, 2)` thay vì `(N, 1, 2)`. Dùng `line.flatten()` để tương thích cả 2 phiên bản.

---

## Bài 15: So sánh các phương pháp phát hiện biên

**Mục tiêu:** Tổng hợp so sánh Sobel, LoG, Canny trên cùng một ảnh.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Tính:
   - **Sobel magnitude** + ngưỡng `T=100`.
   - **LoG** (Bài 5) + ngưỡng.
   - **Canny** với `(100, 200)`.
3. Đo **số pixel biên** của mỗi phương pháp.
4. Hiển thị 4 ảnh + bảng so sánh.
5. Lưu kết quả vào `output/bai15_compare.png`.

---

## Bài 16: Pipeline phân đoạn hoàn chỉnh

**Mục tiêu:** Kết hợp nhiều kỹ thuật để phân đoạn đối tượng trên nền phức tạp.

**Yêu cầu:**
1. Tải ảnh `data.coins()`.
2. Xây dựng pipeline:
   - **Bước 1:** Làm mịn Gaussian (giảm nhiễu).
   - **Bước 2:** Phân ngưỡng Otsu.
   - **Bước 3:** Morphology (mở rồi đóng) để làm sạch mask.
   - **Bước 4:** Tìm contour và vẽ lên ảnh gốc.
3. Hiển thị từng bước; đếm số đồng xu phát hiện được.
4. Lưu kết quả vào `output/bai16_pipeline.png`.
