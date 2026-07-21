# THỰC HÀNH CHƯƠNG 2
## XỬ LÝ ẢNH & THỊ GIÁC MÁY TÍNH
### Biến đổi ảnh (Miền không gian, Histogram và Miền tần số)

---

## Mục tiêu chương

Sau khi hoàn thành các bài tập thực hành này, sinh viên có thể:

- Áp dụng các phép biến đổi cường độ: ảnh âm bản, log, gamma, và hàm bậc thang
- Triển khai các bộ lọc không gian: làm mịn (Mean, Gaussian, Median) và làm nét (Laplacian, Sobel, Unsharp Masking)
- Xử lý histogram: cân bằng histogram và phân tích ảnh dựa trên histogram
- Thực hiện biến đổi Fourier (FFT) và lọc trong miền tần số
- Đánh giá và so sánh hiệu quả của các kỹ thuật lọc trong các tình huống khác nhau

---

## Chuẩn bị

- Cài đặt Python 3.11+ và các thư viện: `opencv-python`, `numpy`, `matplotlib`, `scipy`
- Ảnh mẫu: `lena.jpg`, `cameraman.jpg` hoặc ảnh tự chọn (nên có vùng tối, sáng và chi tiết)
- Tạo cấu trúc thư mục:
  ```
  chapter_2_lab/
  ├── images/          # Ảnh đầu vào
  ├── output/          # Kết quả xử lý
  └── src/             # Mã nguồn Python
  ```

---

## Ôn tập lý thuyết trọng tâm

| Kỹ thuật | Công thức / Đặc điểm | Ứng dụng |
|----------|---------------------|----------|
| **Âm bản** | $s = 255 - r$ | Tăng chi tiết trong vùng tối (ảnh X-quang) |
| **Biến đổi Log** | $s = c·log(1+r)$ | Mở rộng vùng tối, nén vùng sáng |
| **Biến đổi Gamma** | $s = c·r^γ$ | $γ < 1$: sáng vùng tối; $γ > 1$: tối vùng sáng |
| **Lọc trung bình** | Kernel đều nhau | Khử nhiễu Gaussian nhẹ |
| **Lọc Gaussian** | Trọng số theo phân phối chuẩn | Làm mờ tự nhiên, giảm nhiễu |
| **Lọc trung vị** | Lấy giá trị trung vị | Khử nhiễu muối tiêu, giữ biên |
| **Laplacian** | Đạo hàm bậc 2 | Phát hiện biên, làm nét |
| **Sobel** | Đạo hàm bậc 1 $(G_x, G_y)$ | Phát hiện biên + hướng |
| **Unsharp Masking** | $g = f + k(f - f_{blur})$ | Làm nét tự nhiên (Photoshop) |
| **Cân bằng Histogram** | Phân phối đều mức xám | Tăng cường tương phản toàn cục |
| **FFT + Lọc tần số** | Nhân phổ với mặt nạ | Lọc tuần hoàn, lọc toàn cục |

---

## Bài tập 1: Biến đổi cường độ (Intensity Transformations)

**Yêu cầu:**

1. Viết hàm tạo ảnh âm bản (Image Negative)
2. Viết hàm biến đổi $Log$ với tham số $c$
3. Viết hàm biến đổi Gamma với tham số $γ$ (thử nghiệm với $γ = 0.4, 1.0, 2.5$)
4. Hiển thị kết quả và lưu ảnh

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex1_intensity_transform.py
import cv2
import numpy as np
import matplotlib.pyplot as plt

def negative(img):
    """Tạo ảnh âm bản: s = 255 - r"""
    return 255 - img

def log_transform(img, c=1.0):
    """Biến đổi Log: s = c * log(1 + r)"""
    img_float = img.astype(np.float32)
    result = c * np.log(1 + img_float)
    result = np.clip(result, 0, 255).astype(np.uint8)
    return result

def gamma_transform(img, gamma=1.0, c=1.0):
    """Biến đổi Gamma: s = c * r^gamma"""
    img_float = img.astype(np.float32) / 255.0
    result = c * np.power(img_float, gamma)
    result = np.clip(result * 255, 0, 255).astype(np.uint8)
    return result

def main():
    img = cv2.imread('images/sample.jpg', cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("Không thể đọc ảnh!")
        return

    # Áp dụng các biến đổi
    neg = negative(img)
    log_img = log_transform(img, c=2.0)
    gamma_04 = gamma_transform(img, gamma=0.4)
    gamma_25 = gamma_transform(img, gamma=2.5)

    # Hiển thị so sánh
    titles = ['Gốc', 'Âm bản', 'Log (c=2)', 'Gamma γ=0.4', 'Gamma γ=2.5']
    images = [img, neg, log_img, gamma_04, gamma_25]

    plt.figure(figsize=(15, 10))
    for i in range(5):
        plt.subplot(2, 3, i+1)
        plt.imshow(images[i], cmap='gray')
        plt.title(titles[i])
        plt.axis('off')
    plt.tight_layout()
    plt.show()

    # Lưu kết quả
    cv2.imwrite('output/negative.jpg', neg)
    cv2.imwrite('output/log_transform.jpg', log_img)
    cv2.imwrite('output/gamma_04.jpg', gamma_04)
    cv2.imwrite('output/gamma_25.jpg', gamma_25)
    print("Đã lưu kết quả biến đổi cường độ.")

if __name__ == "__main__":
    main()
```
</div>

**Câu hỏi kiểm tra:**
- Khi $γ = 0.4$, vùng nào được làm sáng nhiều hơn? Giải thích.
- Với ảnh y tế, nên dùng biến đổi nào để thấy rõ chi tiết xương trong ảnh tối?

---

## Bài tập 2: Biến đổi hàm bậc thang (Piecewise-Linear)

**Yêu cầu:**

1. Cài đặt hàm tăng cường tương phản (contrast stretching) với các điểm điều khiển tùy chỉnh
2. Cài đặt kỹ thuật cắt mức xám (Gray-level slicing) để làm nổi bật một dải giá trị cụ thể
3. Thực hiện trích xuất bit-plane và hiển thị 8 mặt phẳng bit của ảnh

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex2_piecewise_linear.py
import cv2
import numpy as np
import matplotlib.pyplot as plt

def contrast_stretching(img, r1=0, s1=0, r2=127, s2=127, r3=255, s3=255):
    """
    Tăng cường tương phản với 3 điểm điều khiển:
    (r1,s1) -> (r2,s2) -> (r3,s3)
    """
    h, w = img.shape
    result = np.zeros_like(img, dtype=np.float32)
    
    # Hàm ánh xạ tuyến tính từng đoạn
    for i in range(h):
        for j in range(w):
            r = img[i, j]
            if r <= r1:
                s = s1
            elif r <= r2:
                s = s1 + (s2 - s1) * (r - r1) / (r2 - r1)
            elif r <= r3:
                s = s2 + (s3 - s2) * (r - r2) / (r3 - r2)
            else:
                s = s3
            result[i, j] = np.clip(s, 0, 255)
    
    return result.astype(np.uint8)

def gray_level_slicing(img, low, high, highlight_value=255):
    """
    Làm nổi bật dải mức xám [low, high]
    Các pixel trong dải được đặt thành highlight_value (mặc định 255)
    Các pixel ngoài dải giữ nguyên
    """
    result = img.copy()
    mask = (img >= low) & (img <= high)
    result[mask] = highlight_value
    return result

def bit_plane_slicing(img):
    """Trích xuất 8 mặt phẳng bit của ảnh 8-bit"""
    planes = []
    for k in range(8):
        plane = (img >> k) & 1
        planes.append(plane * 255)  # Nhân 255 để hiển thị 0/255
    return planes

def main():
    img = cv2.imread('images/sample.jpg', cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("Không thể đọc ảnh!")
        return

    # ---- 1. Tăng cường tương phản ----
    stretched = contrast_stretching(img, r1=50, s1=0, r2=150, s2=255, r3=255, s3=255)
    cv2.imwrite('output/contrast_stretched.jpg', stretched)

    # ---- 2. Cắt mức xám ----
    # Làm nổi bật vùng xám từ 100 đến 200
    sliced = gray_level_slicing(img, low=100, high=200, highlight_value=255)
    cv2.imwrite('output/gray_slicing.jpg', sliced)

    # ---- 3. Trích xuất bit-plane ----
    planes = bit_plane_slicing(img)
    plt.figure(figsize=(15, 10))
    for k in range(8):
        plt.subplot(2, 4, k+1)
        plt.imshow(planes[k], cmap='gray')
        plt.title(f'Bit {k}')
        plt.axis('off')
    plt.tight_layout()
    plt.show()
    
    # Lưu 2 mặt phẳng bit quan trọng nhất
    cv2.imwrite('output/bit7_plane.jpg', planes[7])  # Bit cao nhất (MSB)
    cv2.imwrite('output/bit0_plane.jpg', planes[0])  # Bit thấp nhất (LSB)

    print("Đã hoàn thành biến đổi bậc thang.")

if __name__ == "__main__":
    main()
```
</div>

**Câu hỏi kiểm tra:**
- Trong 8 mặt phẳng bit, mặt phẳng nào chứa nhiều thông tin cấu trúc nhất? Mặt nào giống nhiễu nhất? Vì sao?
- Gray-level slicing thường được dùng trong lĩnh vực nào? Cho ví dụ.

---

## Bài tập 3: Bộ lọc làm mịn (Smoothing Filters)

**Yêu cầu:**

1. Đọc ảnh và thêm nhiễu: **nhiễu Gaussian** và **nhiễu muối tiêu**
2. Áp dụng các bộ lọc làm mịn: Mean, Gaussian, Median
3. So sánh hiệu quả khử nhiễu của từng phương pháp, tính PSNR/SSIM (nếu có thể)

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex3_smoothing_filters.py
import cv2
import numpy as np
import matplotlib.pyplot as plt

def add_gaussian_noise(img, mean=0, sigma=25):
    """Thêm nhiễu Gaussian"""
    noise = np.random.normal(mean, sigma, img.shape).astype(np.float32)
    noisy = img.astype(np.float32) + noise
    return np.clip(noisy, 0, 255).astype(np.uint8)

def add_salt_pepper_noise(img, prob=0.05):
    """Thêm nhiễu muối tiêu (5% pixel bị nhiễu)"""
    noisy = img.copy()
    h, w = img.shape
    n_pixels = int(h * w * prob)
    
    # Muối (salt) - giá trị 255
    coords = [np.random.randint(0, h, n_pixels), np.random.randint(0, w, n_pixels)]
    noisy[coords[0], coords[1]] = 255
    
    # Tiêu (pepper) - giá trị 0
    coords = [np.random.randint(0, h, n_pixels), np.random.randint(0, w, n_pixels)]
    noisy[coords[0], coords[1]] = 0
    
    return noisy

def psnr(original, denoised):
    """Tính PSNR (Peak Signal-to-Noise Ratio)"""
    mse = np.mean((original.astype(float) - denoised.astype(float)) ** 2)
    if mse == 0:
        return float('inf')
    return 20 * np.log10(255.0 / np.sqrt(mse))

def main():
    img = cv2.imread('images/sample.jpg', cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("Không thể đọc ảnh!")
        return

    # Thêm nhiễu
    img_gaussian_noise = add_gaussian_noise(img, sigma=30)
    img_sp_noise = add_salt_pepper_noise(img, prob=0.05)
    
    cv2.imwrite('output/gaussian_noise.jpg', img_gaussian_noise)
    cv2.imwrite('output/sp_noise.jpg', img_sp_noise)

    # ---- Lọc các ảnh nhiễu ----
    # Với ảnh nhiễu Gaussian
    gaussian_denoise_mean = cv2.blur(img_gaussian_noise, (5, 5))
    gaussian_denoise_gaussian = cv2.GaussianBlur(img_gaussian_noise, (5, 5), sigmaX=1.5)
    gaussian_denoise_median = cv2.medianBlur(img_gaussian_noise, 5)

    # Với ảnh nhiễu muối tiêu
    sp_denoise_mean = cv2.blur(img_sp_noise, (5, 5))
    sp_denoise_gaussian = cv2.GaussianBlur(img_sp_noise, (5, 5), sigmaX=1.5)
    sp_denoise_median = cv2.medianBlur(img_sp_noise, 5)

    # ---- Hiển thị kết quả ----
    plt.figure(figsize=(15, 10))

    # Hàng 1: Nhiễu Gaussian
    titles_g = ['Nhiễu Gauss', 'Mean 5x5', 'Gaussian 5x5', 'Median 5x5']
    imgs_g = [img_gaussian_noise, gaussian_denoise_mean, 
              gaussian_denoise_gaussian, gaussian_denoise_median]
    for i in range(4):
        plt.subplot(2, 4, i+1)
        plt.imshow(imgs_g[i], cmap='gray')
        plt.title(titles_g[i])
        plt.axis('off')
        if i > 0:
            psnr_val = psnr(img, imgs_g[i])
            plt.xlabel(f'PSNR: {psnr_val:.2f} dB')

    # Hàng 2: Nhiễu muối tiêu
    titles_sp = ['Nhiễu SP', 'Mean 5x5', 'Gaussian 5x5', 'Median 5x5']
    imgs_sp = [img_sp_noise, sp_denoise_mean, sp_denoise_gaussian, sp_denoise_median]
    for i in range(4):
        plt.subplot(2, 4, i+5)
        plt.imshow(imgs_sp[i], cmap='gray')
        plt.title(titles_sp[i])
        plt.axis('off')
        if i > 0:
            psnr_val = psnr(img, imgs_sp[i])
            plt.xlabel(f'PSNR: {psnr_val:.2f} dB')

    plt.tight_layout()
    plt.show()
    
    print("Đã lưu kết quả lọc làm mịn vào thư mục output/")

if __name__ == "__main__":
    main()
```
</div>

**Câu hỏi kiểm tra:**
- Với nhiễu Gaussian, bộ lọc nào cho PSNR cao nhất? Với nhiễu muối tiêu, bộ lọc nào tốt nhất?
- Tại sao Median Filter giữ biên tốt hơn Mean Filter?

---

## Bài tập 4: Bộ lọc làm nét (Sharpening Filters)

**Yêu cầu:**

1. Áp dụng bộ lọc Laplacian để phát hiện biên và làm nét ảnh
2. Áp dụng bộ lọc Sobel để tính gradient theo 2 hướng và độ lớn
3. Triển khai Unsharp Masking với các hệ số k khác nhau
4. So sánh kết quả giữa các phương pháp làm nét

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex4_sharpening_filters.py
import cv2
import numpy as np
import matplotlib.pyplot as plt

def unsharp_masking(img, blur_ksize=5, k=1.0):
    """
    Unsharp Masking: g = img + k * (img - blurred)
    k = 1: Unsharp Masking tiêu chuẩn
    k > 1: Highboost Filtering
    """
    blurred = cv2.GaussianBlur(img, (blur_ksize, blur_ksize), sigmaX=2.0)
    mask = img.astype(np.float32) - blurred.astype(np.float32)
    result = img.astype(np.float32) + k * mask
    return np.clip(result, 0, 255).astype(np.uint8)

def main():
    img = cv2.imread('images/sample.jpg', cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("Không thể đọc ảnh!")
        return

    # ---- 1. Laplacian ----
    laplacian = cv2.Laplacian(img, cv2.CV_64F)
    laplacian = np.abs(laplacian).astype(np.uint8)
    
    # Làm nét bằng Laplacian (tâm kernel mặc định là âm -> g = img - laplacian)
    sharp_laplacian = cv2.Laplacian(img, cv2.CV_64F)
    sharp_laplacian = img.astype(np.float32) - sharp_laplacian
    sharp_laplacian = np.clip(sharp_laplacian, 0, 255).astype(np.uint8)

    # ---- 2. Sobel ----
    sobelx = cv2.Sobel(img, cv2.CV_64F, 1, 0, ksize=3)
    sobely = cv2.Sobel(img, cv2.CV_64F, 0, 1, ksize=3)
    magnitude = np.sqrt(sobelx**2 + sobely**2)
    magnitude = np.clip(magnitude, 0, 255).astype(np.uint8)

    # ---- 3. Unsharp Masking ----
    usm_k1 = unsharp_masking(img, blur_ksize=5, k=1.0)
    usm_k2 = unsharp_masking(img, blur_ksize=5, k=2.0)
    usm_k3 = unsharp_masking(img, blur_ksize=5, k=3.0)

    # Lưu ảnh
    cv2.imwrite('output/laplacian_edge.jpg', laplacian)
    cv2.imwrite('output/sharp_laplacian.jpg', sharp_laplacian)
    cv2.imwrite('output/sobel_magnitude.jpg', magnitude)
    cv2.imwrite('output/usm_k1.jpg', usm_k1)
    cv2.imwrite('output/usm_k2.jpg', usm_k2)
    cv2.imwrite('output/usm_k3.jpg', usm_k3)

    # ---- Hiển thị ----
    plt.figure(figsize=(15, 8))
    
    plt.subplot(2, 3, 1)
    plt.imshow(img, cmap='gray')
    plt.title('Gốc')
    plt.axis('off')
    
    plt.subplot(2, 3, 2)
    plt.imshow(laplacian, cmap='gray')
    plt.title('Laplacian (Biên)')
    plt.axis('off')
    
    plt.subplot(2, 3, 3)
    plt.imshow(sharp_laplacian, cmap='gray')
    plt.title('Laplacian (Làm nét)')
    plt.axis('off')
    
    plt.subplot(2, 3, 4)
    plt.imshow(magnitude, cmap='gray')
    plt.title('Sobel (Gradient)')
    plt.axis('off')
    
    plt.subplot(2, 3, 5)
    plt.imshow(usm_k1, cmap='gray')
    plt.title('USM k=1.0')
    plt.axis('off')
    
    plt.subplot(2, 3, 6)
    plt.imshow(usm_k3, cmap='gray')
    plt.title('Highboost k=3.0')
    plt.axis('off')
    
    plt.tight_layout()
    plt.show()
    
    print("Đã lưu kết quả làm nét.")

if __name__ == "__main__":
    main()
```
</div>

**Câu hỏi kiểm tra:**
- Quan sát ảnh Highboost $k=3.0$, hiệu ứng gì xuất hiện khi $k$ quá lớn?
- Sobel khác Laplacian như thế nào về thông tin hướng biên?

---

## Bài tập 5: Xử lý Histogram

**Yêu cầu:**

1. Vẽ histogram và CDF (hàm phân phối tích lũy) của ảnh gốc
2. Cân bằng histogram (Histogram Equalization) và so sánh ảnh/histogram trước và sau
3. Hiển thị histogram của ảnh sau khi cân bằng, nhận xét

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex5_histogram_processing.py
import cv2
import numpy as np
import matplotlib.pyplot as plt

def plot_histogram(img, title='Histogram', color='black'):
    """Vẽ histogram của ảnh"""
    hist = cv2.calcHist([img], [0], None, [256], [0, 256])
    plt.bar(range(256), hist.ravel(), width=1, color=color)
    plt.title(title)
    plt.xlabel('Mức xám')
    plt.ylabel('Số pixel')
    return hist

def plot_cdf(img):
    """Vẽ CDF của ảnh"""
    hist = cv2.calcHist([img], [0], None, [256], [0, 256])
    cdf = hist.cumsum()
    cdf_normalized = cdf / cdf.max()
    plt.plot(cdf_normalized, color='blue')
    plt.title('CDF (Hàm phân phối tích lũy)')
    plt.xlabel('Mức xám')
    plt.ylabel('Xác suất tích lũy')

def main():
    img = cv2.imread('images/sample.jpg', cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("Không thể đọc ảnh!")
        return

    # ---- Cân bằng histogram ----
    equalized = cv2.equalizeHist(img)
    cv2.imwrite('output/equalized.jpg', equalized)

    # ---- So sánh ảnh ----
    plt.figure(figsize=(15, 10))
    
    # Cột trái: Ảnh gốc
    plt.subplot(2, 3, 1)
    plt.imshow(img, cmap='gray')
    plt.title('Ảnh gốc')
    plt.axis('off')
    
    plt.subplot(2, 3, 2)
    plot_histogram(img, title='Histogram gốc')
    
    plt.subplot(2, 3, 3)
    plot_cdf(img)
    plt.grid(True)
    
    # Cột phải: Ảnh đã cân bằng
    plt.subplot(2, 3, 4)
    plt.imshow(equalized, cmap='gray')
    plt.title('Sau cân bằng histogram')
    plt.axis('off')
    
    plt.subplot(2, 3, 5)
    plot_histogram(equalized, title='Histogram sau cân bằng', color='red')
    
    plt.subplot(2, 3, 6)
    plot_cdf(equalized)
    plt.grid(True)
    
    plt.tight_layout()
    plt.show()
    
    # ---- Phân tích ----
    print("=== Phân tích sau cân bằng ===")
    print(f"Độ sáng trung bình gốc: {np.mean(img):.2f}")
    print(f"Độ sáng trung bình sau: {np.mean(equalized):.2f}")
    print(f"Độ lệch chuẩn gốc: {np.std(img):.2f}")
    print(f"Độ lệch chuẩn sau: {np.std(equalized):.2f}")

if __name__ == "__main__":
    main()
```
</div>

**Thực hành thêm với CLAHE:**
Thử áp dụng CLAHE (Contrast Limited Adaptive Histogram Equalization) để tránh tăng nhiễu ở vùng đồng nhất:

```python
clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
cl1 = clahe.apply(img)
cv2.imwrite('output/clahe.jpg', cl1)
```

---

## Bài tập 6: Biến đổi và lọc trong miền tần số (FFT)

**Yêu cầu:**

1. Biến đổi ảnh sang miền tần số bằng FFT, hiển thị phổ biên độ (log scale)
2. Tạo bộ lọc thông thấp (Ideal LPF và Gaussian LPF) với các bán kính $D_0$ khác nhau
3. Tạo bộ lọc thông cao (Ideal HPF và Gaussian HPF)
4. Áp dụng lọc và biến đổi ngược để khôi phục ảnh
5. So sánh kết quả với lọc trong miền không gian

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex6_frequency_filtering.py
import cv2
import numpy as np
import matplotlib.pyplot as plt

def apply_fft(img):
    """Biến đổi Fourier và dịch tâm"""
    f = np.fft.fft2(img)
    fshift = np.fft.fftshift(f)
    return f, fshift

def inverse_fft(fshift):
    """Biến đổi Fourier ngược và lấy phần thực"""
    f_ishift = np.fft.ifftshift(fshift)
    img_back = np.fft.ifft2(f_ishift)
    return np.abs(img_back).astype(np.uint8)

def create_ideal_lpf_mask(shape, D0):
    """Tạo mặt nạ lọc thông thấp lý tưởng"""
    rows, cols = shape
    crow, ccol = rows // 2, cols // 2
    mask = np.zeros(shape, dtype=np.float32)
    for i in range(rows):
        for j in range(cols):
            D = np.sqrt((i - crow)**2 + (j - ccol)**2)
            if D <= D0:
                mask[i, j] = 1
    return mask

def create_gaussian_lpf_mask(shape, D0):
    """Tạo mặt nạ lọc thông thấp Gaussian"""
    rows, cols = shape
    crow, ccol = rows // 2, cols // 2
    mask = np.zeros(shape, dtype=np.float32)
    for i in range(rows):
        for j in range(cols):
            D = np.sqrt((i - crow)**2 + (j - ccol)**2)
            mask[i, j] = np.exp(-(D**2) / (2 * (D0**2)))
    return mask

def frequency_filter(img, D0, filter_type='ideal', mode='lowpass'):
    """
    Thực hiện lọc trong miền tần số
    filter_type: 'ideal' hoặc 'gaussian'
    mode: 'lowpass' hoặc 'highpass'
    """
    # Biến đổi Fourier
    f, fshift = apply_fft(img)
    
    # Tạo mặt nạ
    if filter_type == 'ideal':
        mask = create_ideal_lpf_mask(img.shape, D0)
    else:
        mask = create_gaussian_lpf_mask(img.shape, D0)
    
    # Chuyển thành high-pass nếu cần
    if mode == 'highpass':
        mask = 1 - mask
    
    # Áp dụng mặt nạ
    fshift_filtered = fshift * mask
    
    # Biến đổi ngược
    img_filtered = inverse_fft(fshift_filtered)
    
    return img_filtered, mask

def main():
    img = cv2.imread('images/sample.jpg', cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("Không thể đọc ảnh!")
        return
    
    # ---- 1. Biến đổi và hiển thị phổ ----
    f, fshift = apply_fft(img)
    magnitude_spectrum = np.log(1 + np.abs(fshift))
    cv2.imwrite('output/magnitude_spectrum.jpg', 
                (magnitude_spectrum / magnitude_spectrum.max() * 255).astype(np.uint8))
    
    # ---- 2. Lọc thông thấp ----
    D0_values = [30, 60, 100]
    
    plt.figure(figsize=(15, 10))
    
    # Hàng 1: Ideal LPF
    for idx, D0 in enumerate(D0_values):
        result, mask = frequency_filter(img, D0, filter_type='ideal', mode='lowpass')
        
        plt.subplot(2, 3, idx+1)
        plt.imshow(result, cmap='gray')
        plt.title(f'Ideal LPF D0={D0}')
        plt.axis('off')
        
        cv2.imwrite(f'output/ideal_lpf_{D0}.jpg', result)
    
    # Hàng 2: Gaussian LPF
    for idx, D0 in enumerate(D0_values):
        result, mask = frequency_filter(img, D0, filter_type='gaussian', mode='lowpass')
        
        plt.subplot(2, 3, idx+4)
        plt.imshow(result, cmap='gray')
        plt.title(f'Gaussian LPF D0={D0}')
        plt.axis('off')
        
        cv2.imwrite(f'output/gaussian_lpf_{D0}.jpg', result)
    
    plt.tight_layout()
    plt.show()
    
    # ---- 3. Lọc thông cao ----
    # So sánh HPF với Ideal và Gaussian
    D0_hp = 30
    
    fig, axes = plt.subplots(1, 3, figsize=(15, 5))
    
    # Ideal HPF
    result_hp_ideal, _ = frequency_filter(img, D0_hp, filter_type='ideal', mode='highpass')
    axes[0].imshow(result_hp_ideal, cmap='gray')
    axes[0].set_title(f'Ideal HPF D0={D0_hp}')
    axes[0].axis('off')
    cv2.imwrite('output/ideal_hpf.jpg', result_hp_ideal)
    
    # Gaussian HPF
    result_hp_gaussian, _ = frequency_filter(img, D0_hp, filter_type='gaussian', mode='highpass')
    axes[1].imshow(result_hp_gaussian, cmap='gray')
    axes[1].set_title(f'Gaussian HPF D0={D0_hp}')
    axes[1].axis('off')
    cv2.imwrite('output/gaussian_hpf.jpg', result_hp_gaussian)
    
    # ---- 4. High-frequency-emphasis ----
    # Lấy mask Gaussian LPF, chuyển thành emphasis
    _, mask_lpf = create_gaussian_lpf_mask(img.shape, D0_hp), _
    mask_hpf = 1 - mask_lpf
    a, b = 1.0, 2.5  # a: giữ nền, b: khuếch đại chi tiết
    mask_emphasis = a + b * mask_hpf
    
    f, fshift = apply_fft(img)
    fshift_emphasis = fshift * mask_emphasis
    result_emphasis = inverse_fft(fshift_emphasis)
    
    axes[2].imshow(result_emphasis, cmap='gray')
    axes[2].set_title(f'High-frequency-emphasis\na={a}, b={b}')
    axes[2].axis('off')
    cv2.imwrite('output/high_freq_emphasis.jpg', result_emphasis)
    
    plt.tight_layout()
    plt.show()
    
    print("Đã hoàn thành lọc miền tần số. Kiểm tra thư mục output/")

if __name__ == "__main__":
    main()
```
</div>

---

## Bài tập nâng cao (Tự chọn)

### Bài 7: Khử nhiễu tuần hoàn trong miền tần số
- Tạo ảnh bị nhiễu sóng sin (cộng thêm tín hiệu sin) và sử dụng Notch Filter để loại bỏ.
- Xác định tần số nhiễu trên phổ Fourier và tạo mặt nạ Notch tương ứng.

### Bài 8: Xây dựng bộ lọc Butterworth
- Cài đặt bộ lọc Butterworth LPF/HPF với tham số bậc n: $H(u,v) = 1 / (1 + (D/D0)^{(2n)})$
- So sánh chất lượng với Ideal và Gaussian (quan sát hiệu ứng ringing).

### Bài 9: Ứng dụng Homomorphic Filtering
- Triển khai Homomorphic Filter để tăng cường ảnh bằng cách tách thành phần chiếu sáng và phản xạ trong miền log + tần số.
- Công thức: $ln(f) = ln(i) + ln(r)$, lọc thành phần chiếu sáng (tần số thấp) và phản xạ (tần số cao), sau đó exp.

### Bài 10: Kết hợp Histogram Equalization và lọc tần số
- Với ảnh chụp trong điều kiện thiếu sáng, áp dụng cân bằng histogram trước, sau đó lọc thông cao để làm nét. Đánh giá chất lượng.
