# Bài tập thực hành chương 2

## Bài 1: Ảnh âm bản (Image Negative)

**Mục tiêu:** Cài đặt công thức `s = L - 1 - r`.

**Yêu cầu:**
1. Tải ảnh xám `data.camera()`.
2. Tính ảnh âm bản bằng công thức `s = 255 - r`.
3. Hiển thị ảnh gốc và ảnh âm bản cạnh nhau.
4. Lưu kết quả vào `output/bai1_negative.png`.

---

## Bài 2: Biến đổi Log

**Mục tiêu:** Cài đặt công thức `s = c · log(1 + r)` để mở rộng vùng tối.

**Yêu cầu:**
1. Tải ảnh `data.camera()`, chuyển sang `float32`.
2. Tính ảnh Log với `c = 255 / log(1 + max(r))`.
3. Hiển thị ảnh gốc, ảnh Log, và histogram của cả hai trong lưới 2×2.
4. Lưu kết quả vào `output/bai2_log.png`.

---

## Bài 3: Biến đổi Gamma (Power-Law)

**Mục tiêu:** Cài đặt công thức `s = c · r^γ`, quan sát ảnh hưởng của γ.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Áp dụng Gamma với `γ ∈ {0.2, 0.5, 1.0, 2.0, 4.0}` (dùng `cv2.LUT`).
3. Hiển thị 5 kết quả + ảnh gốc trong lưới 2×3.
4. Lưu kết quả vào `output/bai3_gamma.png`.

---

## Bài 4: Biến đổi tuyến tính từng đoạn (Contrast Stretching)

**Mục tiêu:** Cài đặt biến đổi piecewise-linear 3 đoạn để tăng độ tương phản.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Cài đặt hàm `contrast_stretch(img, r1, s1, r2, s2)` với công thức:
   - Đoạn 1: `(0,0) → (r1,s1)`
   - Đoạn 2: `(r1,s1) → (r2,s2)` (dốc lớn → tăng tương phản)
   - Đoạn 3: `(r2,s2) → (255,255)`
3. Áp dụng với `(r1,s1,r2,s2) = (70, 0, 180, 255)` và `(100, 0, 150, 255)`.
4. Hiển thị ảnh gốc, 2 kết quả, và histogram tương ứng.
5. Lưu kết quả vào `output/bai4_contrast_stretch.png`.

---

## Bài 5: Cắt mức xám (Gray-Level Slicing)

**Mục tiêu:** Làm nổi bật một dải mức xám cụ thể — ứng dụng trong ảnh y tế.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Cài đặt 2 biến thể:
   - **Binary slicing:** pixel trong `[a, b]` → 255, ngoài → 0.
   - **Preserve slicing:** pixel trong `[a, b]` → 255, ngoài → giữ nguyên ảnh gốc.
3. Áp dụng với dải `[100, 150]`.
4. Hiển thị và lưu kết quả vào `output/bai5_gray_slicing.png`.

---

## Bài 6: Trích xuất Bit-Plane

**Mục tiêu:** Phân tích đóng góp của từng bit trong byte biểu diễn pixel.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Trích xuất 8 bit-plane: `plane_b = (img >> b) & 1`, nhân 255 để hiển thị.
3. Hiển thị cả 8 plane trong lưới 2×4.
4. Lưu các bit-plane quan trọng (bit 7 và bit 6) vào `output/`.

---

## Bài 7: Lọc trung bình (Mean Filter) — cài đặt thủ công

**Mục tiêu:** Hiểu cơ chế convolution bằng cách tự cài đặt kernel 3×3 và so sánh với OpenCV.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Cài đặt thủ công hàm `mean_filter_manual(img, ksize)` dùng vòng lặp (chỉ chạy với ảnh nhỏ cắt ra để minh họa).
3. So sánh với `cv2.blur(img, (ksize, ksize))` và `cv2.filter2D`.
4. Áp dụng kernel 3×3, 5×5, 9×9 lên ảnh gốc, hiển thị kết quả.
5. Lưu kết quả vào `output/bai7_mean_filter.png`.

---

## Bài 8: Lọc Gaussian

**Mục tiêu:** Hiểu tác dụng của σ (độ lệch chuẩn) trong kernel Gaussian.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Áp dụng `cv2.GaussianBlur` với 3 cặp tham số:
   - `ksize=5, sigma=1`
   - `ksize=5, sigma=5`
   - `ksize=15, sigma=5`
3. So sánh với lọc trung bình `cv2.blur(5×5)`.
4. Hiển thị và lưu kết quả vào `output/bai8_gaussian.png`.

---

## Bài 9: Lọc trung vị — Khử nhiễu muối tiêu

**Mục tiêu:** Minh họa sức mạnh của Median filter với nhiễu salt-and-pepper.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Thêm nhiễu muối tiêu tỉ lệ 5% và 10%.
3. Khử nhiễu bằng `cv2.medianBlur` (k=3, 5) và so sánh với `cv2.blur` (mean 3×3).
4. Tính MSE giữa ảnh khử nhiễu và ảnh gốc cho từng phương pháp.
5. Hiển thị và lưu kết quả vào `output/bai9_median.png`.

---

## Bài 10: Bộ lọc Laplacian — Làm nét ảnh

**Mục tiêu:** Làm nét ảnh bằng Laplacian theo công thức `g = f - k·∇²f`.

**Yêu cầu:**
1. Tải ảnh `data.camera()` (hoặc `data.moon()`).
2. Tính `Laplacian` bằng `cv2.Laplacian(img, cv2.CV_64F)`.
3. Làm nét ảnh gốc: `g = img - k * laplacian` với `k ∈ {0.5, 1.0, 2.0}`.
4. Hiển thị ảnh gốc, ảnh Laplace (chuẩn hóa), và 3 ảnh làm nét.
5. Lưu kết quả vào `output/bai10_laplacian.png`.

---

## Bài 11: Bộ lọc Sobel — Gradient và phát hiện biên

**Mục tiêu:** Tính đạo hàm theo 2 hướng và độ lớn gradient.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Tính `Gx`, `Gy` bằng `cv2.Sobel` (kernel 3×3, `CV_64F`).
3. Tính độ lớn gradient: `M = sqrt(Gx² + Gy²)` và xấp xỉ `|Gx| + |Gy|`.
4. So sánh sai số giữa 2 cách tính (in ra giá trị trung bình).
5. Hiển thị ảnh gốc, Gx, Gy, M, xấp xỉ M; lưu vào `output/bai11_sobel.png`.

---

## Bài 12: Unsharp Masking & Highboost Filtering

**Mục tiêu:** Cài đặt công thức `g = f + k·(f - f_blur)`.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Làm mờ bằng Gaussian σ=2, ksize=5×5 để được `f_blur`.
3. Tính mask `m = f - f_blur`.
4. Tạo ảnh:
   - **Unsharp Masking** (k=1): `g = f + 1·m`.
   - **Highboost** với k = 1.5, 2.5.
5. Hiển thị ảnh gốc, mask (chuẩn hóa), và 3 kết quả.
6. Lưu kết quả vào `output/bai12_unsharp.png`.

---

## Bài 13: Histogram và Cân bằng Histogram

**Mục tiêu:** Áp dụng `cv2.equalizeHist` để tăng tương phản toàn cục.

**Yêu cầu:**
1. Tải ảnh `data.camera()` và tạo thêm một ảnh tối bằng `img * 0.4`.
2. Áp dụng `cv2.equalizeHist` cho cả hai ảnh.
3. Hiển thị ảnh + histogram trước và sau cân bằng (lưới 3×2).
4. Lưu kết quả vào `output/bai13_equalization.png`.

---

## Bài 14: Khớp Histogram (Histogram Matching)

**Mục tiêu:** Cài đặt thuật toán khớp histogram theo mẫu chỉ định.

**Yêu cầu:**
1. Dùng 2 ảnh `data.camera()` (source) và `data.moon()` (template).
2. Cài đặt hàm `histogram_matching(source, template)`:
   - Tính CDF của source và template.
   - Với mỗi mức xám `i` của source, tìm `j` trong template sao cho `CDF_template(j) ≥ CDF_source(i)`.
3. Hiển thị ảnh source, template, ảnh matched + 3 histogram tương ứng (lưới 2×3).
4. Lưu kết quả vào `output/bai14_hist_matching.png`.

---

## Bài 15: Biến đổi Fourier — Phổ tần số

**Mục tiêu:** Hiểu ý nghĩa của phổ Fourier, tính chất dịch chuyển và đối xứng.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Tính FFT bằng `np.fft.fft2`, dịch tâm bằng `np.fft.fftshift`.
3. Hiển thị phổ biên độ log: `20·log(1 + |F|)`.
4. Chứng minh tính dịch chuyển: dịch ảnh đi `(50, 50)` — phổ **không đổi** về biên độ. In sai số tuyệt đối trung bình giữa 2 phổ.
5. Hiển thị ảnh gốc, ảnh dịch, và 2 phổ cạnh nhau.
6. Lưu kết quả vào `output/bai15_fft.png`.

---

## Bài 16: Lọc thông thấp trong miền tần số (Ideal & Gaussian LPF)

**Mục tiêu:** Cài đặt LPF trong miền tần số và so sánh ILPF với GLPF.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Cài đặt hàm `ideal_lpf(shape, D0)` và `gaussian_lpf(shape, D0)`.
3. Áp dụng với `D0 ∈ {10, 30, 60}` cho cả 2 loại.
4. Biến đổi ngược và hiển thị.
5. So sánh hiện tượng ringing của ILPF so với GLPF.
6. Lưu kết quả vào `output/bai16_lpf.png`.

---

## Bài 17: Lọc thông cao & High-Frequency Emphasis

**Mục tiêu:** Cài đặt HPF và giải quyết vấn đề ảnh bị tối bằng High-frequency Emphasis.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Tính `H_HP = 1 - H_LP` (Gaussian).
3. Áp dụng HPF với `D0 = 30` — quan sát ảnh bị tối mất độ sáng tổng thể.
4. Cài đặt High-frequency Emphasis: `H = a + b·H_HP` với `(a, b) = (0.5, 2.0)`.
5. Hiển thị ảnh gốc, ảnh HPF thuần, ảnh High-frequency Emphasis.
6. Lưu kết quả vào `output/bai17_hpf.png`.

---

## Bài 18: Lọc Notch — Khử nhiễu tuần hoàn

**Mục tiêu:** Loại bỏ nhiễu tuần hoàn (định kỳ) bằng bộ lọc Notch trong miền tần số.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Thêm nhiễu tuần hoàn sin (nhiễu định kỳ) với `A=40, u0=0.15, v0=0.15` tạo các **đỉnh sáng** trên phổ.
3. Xác định vị trí đỉnh nhiễu trên phổ.
4. Cài đặt notch filter: đặt giá trị 0 tại các đỉnh nhiễu (và đối xứng của chúng) với bán kính `r=8`.
5. Biến đổi ngược, hiển thị ảnh gốc, ảnh nhiễu, ảnh khử nhiễu + phổ tương ứng.
6. Lưu kết quả vào `output/bai18_notch.png`.
