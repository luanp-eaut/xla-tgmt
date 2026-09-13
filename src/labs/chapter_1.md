# Bài tập thực hành chương 1

## Bài 1: Đọc, hiển thị và lưu ảnh

**Mục tiêu:** Làm quen với các hàm `cv2.imread()`, `cv2.imwrite()` và biểu diễn ảnh dưới dạng mảng NumPy.

**Yêu cầu:**
1. Tải ảnh xám `data.camera()` và ảnh màu `data.astronaut()` từ `skimage`.
2. Lưu hai ảnh này vào thư mục `images/` dưới định dạng `.png`.
3. Đọc lại ảnh màu bằng `cv2.imread()` và in ra kích thước, kiểu dữ liệu, số kênh màu, giá trị min/max.
4. Hiển thị cả hai ảnh cạnh nhau bằng `matplotlib`.
5. Lưu kết quả hiển thị vào `output/bai1_output.png`.

---

## Bài 2: Thông tin ảnh và biểu diễn ma trận

**Mục tiêu:** Hiểu cách ảnh số được biểu diễn dưới dạng ma trận M×N (xám) hoặc M×N×3 (màu).

**Yêu cầu:**
1. Viết hàm `print_image_info(img, name)` in ra: shape, dtype, min, max, số kênh màu (nếu có).
2. Áp dụng cho 3 ảnh: `data.camera()`, `data.astronaut()`, `data.coins()`.
3. Truy cập và in giá trị pixel tại vị trí `(100, 200)` của ảnh xám camera.
4. Trích xuất và hiển thị một vùng ảnh (crop) kích thước 100×100 từ góc trên-trái của ảnh camera; lưu vào `output/bai2_crop.png`.

---

## Bài 3: Chuyển đổi không gian màu

**Mục tiêu:** Hiểu các không gian màu RGB, Gray, HSV và công thức chuyển đổi.

**Yêu cầu:**
1. Chuyển ảnh `astronaut()` từ RGB sang Gray bằng `cv2.cvtColor`.
2. Chuyển RGB sang Gray **thủ công** bằng công thức: `Gray = 0.299·R + 0.587·G + 0.114·B`.
3. So sánh kết quả hai cách (tính sai số tuyệt đối trung bình và sai số tối đa).
4. Chuyển RGB sang HSV và trích xuất 3 kênh H, S, V riêng biệt.
5. Hiển thị ảnh gốc, 2 ảnh Gray và 3 kênh HSV trong lưới 2×3; lưu vào `output/bai3_color_spaces.png`.

---

## Bài 4: Biến đổi hình học cơ bản

**Mục tiêu:** Sử dụng `cv2.resize`, `cv2.flip`, `cv2.rotate`.

**Yêu cầu:**
1. Resize ảnh `astronaut()` xuống 50% và lên 200% (dùng `INTER_LINEAR` và `INTER_CUBIC`).
2. Lật ảnh theo 3 chế độ: ngang, dọc, cả hai.
3. Xoay ảnh 90°, 180°, 270°.
4. Hiển thị tất cả kết quả (gồm cả ảnh gốc) trong lưới 3×3 và lưu vào `output/bai4_geometric.png`.

---

## Bài 5: Vẽ hình học lên ảnh

**Mục tiêu:** Sử dụng `cv2.line`, `cv2.rectangle`, `cv2.circle`, `cv2.putText`.

**Yêu cầu:**
Tạo một canvas trắng kích thước 400×600 bằng NumPy, sau đó vẽ:
1. Một đường thẳng đỏ ngang ở `y = 50`, từ `x = 50` đến `x = 550`, độ dày 3.
2. Một hình chữ nhật viền xanh lá từ `(50,100)` đến `(250,250)`, độ dày 2.
3. Một hình tròn đặc màu xanh dương tâm `(450,200)` bán kính 80.
4. Dòng chữ `"XLA & TGMT"` tại `(150, 350)`.
5. Hiển thị và lưu kết quả vào `output/bai5_drawing.png`.

---

## Bài 6: Phép toán số học trên ảnh

**Mục tiêu:** Hiểu phép toán theo phần tử (elementwise): cộng, trừ, tạo ảnh âm bản, trung bình 2 ảnh.

**Yêu cầu:**
1. Tạo ảnh âm bản của `data.camera()` bằng công thức `s = 255 - r`.
2. Tăng độ sáng ảnh bằng `cv2.add(img, 50)` (tránh tràn số).
3. Giảm độ sáng ảnh bằng `cv2.subtract(img, 50)`.
4. Trộn `camera` và `coins` (đã resize cùng kích thước) với trọng số 0.5/0.5 bằng `cv2.addWeighted`.
5. Hiển thị ảnh gốc + 5 kết quả trong lưới 2×3 và lưu vào `output/bai6_arithmetic.png`.

---

## Bài 7: Phép toán logic trên ảnh

**Mục tiêu:** Sử dụng `cv2.bitwise_and/or/not/xor` trên ảnh nhị phân (mask).

**Yêu cầu:**
1. Tạo mask A: hình chữ nhật trắng từ `(50,50)` đến `(200,200)` trên nền đen 300×300.
2. Tạo mask B: hình tròn trắng tâm `(200,200)` bán kính 100.
3. Tính `AND`, `OR`, `NOT A`, `XOR` của hai mask.
4. Hiển thị tất cả 6 ảnh (A, B, AND, OR, NOT A, XOR) trong lưới 2×3 và lưu vào `output/bai7_logic.png`.

---

## Bài 8: Trung bình ảnh để giảm nhiễu Gaussian

**Mục tiêu:** Minh họa nguyên lý "trung bình k ảnh nhiễu → phương sai nhiễu giảm k lần".

**Yêu cầu:**
1. Lấy ảnh sạch `data.camera()`, chuyển sang `float32`.
2. Viết hàm `add_gaussian_noise(img, sigma=25)` thêm nhiễu Gaussian.
3. Với `K ∈ {1, 5, 10, 20, 50}`: tạo K ảnh nhiễu, tính trung bình, lưu kết quả.
4. Tính MSE giữa ảnh trung bình và ảnh sạch cho từng K → in ra bảng.
5. Hiển thị ảnh sạch, 1 ảnh nhiễu, và 5 ảnh trung bình trong lưới; lưu ảnh trung bình của 50 ảnh nhiễu vào `output/bai8_avg50.png`.

---

## Bài 9: Mô phỏng lấy mẫu và lượng tử hóa

**Mục tiêu:** Hiểu vai trò của sampling (độ phân giải không gian) và quantization (độ phân giải cường độ), quan sát hiện tượng false contouring.

**Yêu cầu:**
1. Viết hàm `downsample(img, factor)` giảm độ phân giải theo hệ số `factor`.
2. Viết hàm `quantize(img, bits)` giảm số mức xám xuống `2^bits`.
3. Hiển thị kết quả với `factor ∈ {1, 2, 4, 8}` (hàng trên) và `bits ∈ {8, 4, 2, 1}` (hàng dưới) trong lưới 2×4.
4. Nhận xét bằng comment: ở mức `bits ≤ 2` hiện tượng gì xuất hiện?
5. Lưu ảnh `downsample x4` và `quantize 2-bit` vào `output/`.

---

## Bài 10: Nội suy ảnh (Nearest / Bilinear / Bicubic)

**Mục tiêu:** So sánh 3 phương pháp nội suy khi phóng to ảnh.

**Yêu cầu:**
1. Downsample ảnh `camera` xuống 10% kích thước bằng `INTER_NEAREST`.
2. Upsample trở lại kích thước gốc bằng 3 phương pháp: `INTER_NEAREST`, `INTER_LINEAR`, `INTER_CUBIC`.
3. Hiển thị ảnh nhỏ và 3 kết quả cạnh nhau.
4. Lưu 3 ảnh kết quả vào `output/bai10_nn.png`, `bai10_bilinear.png`, `bai10_bicubic.png`.

---

## Bài 11: Láng giềng của một điểm ảnh

**Mục tiêu:** Cài đặt N4(p), ND(p), N8(p) và xử lý biên ảnh.

**Yêu cầu:**
1. Viết hàm `get_neighbors(p, shape, mode)` trả về danh sách tọa độ láng giềng của pixel `p` trong ảnh kích thước `shape`, với `mode ∈ {'N4', 'ND', 'N8'}`.
2. Kiểm tra với pixel trung tâm `(2,2)`, pixel góc `(0,0)`, pixel biên `(0,2)` trên ảnh 5×5.
3. In kết quả rõ ràng.
4. **Trực quan hóa** láng giềng trên lưới 5×5 (đỏ = pixel p, xanh = láng giềng, trắng = pixel còn lại) và lưu vào `output/bai11_neighbors.png`.

---

## Bài 12: Các độ đo khoảng cách

**Mục tiêu:** Cài đặt và so sánh khoảng cách Euclidean, City-block, Chessboard.

**Yêu cầu:**
1. Viết 3 hàm `dist_euclidean`, `dist_cityblock`, `dist_chessboard`.
2. Kiểm tra với ví dụ trong slide: `p=(2,3)`, `q=(5,7)` → kỳ vọng lần lượt là `5`, `7`, `4`.
3. Vẽ minh họa "hình dạng" của các đường đẳng khoảng cách (R=5) trên lưới 21×21, tâm `(10,10)`.
4. Lưu kết quả minh họa vào `output/bai12_distance.png`.

---

## Bài 13: Thống kê cường độ ảnh (Histogram, Mean, Variance)

**Mục tiêu:** Cài đặt thủ công histogram, mean, variance từ công thức slide và so sánh với NumPy.

**Yêu cầu:**
1. Tính histogram `p(z_k) = n_k / (M·N)` của ảnh `camera` bằng `np.bincount`.
2. Tính `mean = Σ z_k·p(z_k)` và `variance = Σ (z_k - mean)²·p(z_k)` **thủ công**.
3. So sánh với `np.mean` và `np.var` — in ra bảng.
4. Vẽ histogram bằng `matplotlib`, hiển thị cạnh ảnh gốc và lưu kết quả vào `output/bai13_histogram.png`.
