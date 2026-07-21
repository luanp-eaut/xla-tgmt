# THỰC HÀNH CHƯƠNG 3
## XỬ LÝ ẢNH & THỊ GIÁC MÁY TÍNH
### Nén ảnh (Lossless & Lossy Compression)

---

## Mục tiêu chương

Sau khi hoàn thành các bài tập thực hành này, sinh viên có thể:

- Tính entropy và đánh giá mức độ dư thừa của ảnh
- Triển khai các thuật toán nén không tổn thất: Huffman, RLE, LZW
- Áp dụng biến đổi DCT và lượng tử hóa để nén ảnh theo chuẩn JPEG
- Sử dụng Wavelet (DWT) và ngưỡng hóa để nén ảnh
- Đánh giá chất lượng ảnh sau nén bằng PSNR và SSIM
- So sánh hiệu quả giữa các phương pháp nén và các mức chất lượng

---

## Chuẩn bị

- Cài đặt Python 3.11+ và các thư viện:
  ```bash
  pip install opencv-python numpy matplotlib scipy scikit-image pywavelets pillow
  ```
- Ảnh mẫu: `lena.jpg`, `cameraman.jpg`, `text_document.png` (ảnh văn bản để test lossless)
- Tạo cấu trúc thư mục:
  ```
  chapter_3_lab/
  ├── images/          # Ảnh đầu vào
  ├── output/          # Kết quả xử lý
  └── src/             # Mã nguồn Python
  ```

---

## Ôn tập lý thuyết trọng tâm

| Phương pháp | Loại | Đặc điểm chính | Tỷ lệ nén |
|-------------|------|----------------|-----------|
| **Huffman** | Lossless | Mã độ dài thay đổi, dùng cây nhị phân | Thấp (2:1 - 3:1) |
| **RLE** | Lossless | Thay chuỗi lặp bằng (giá trị, độ dài) | Tốt với ảnh nhị phân |
| **LZW** | Lossless | Từ điển động, không cần gửi kèm bảng mã | Trung bình |
| **Số học (Arithmetic)** | Lossless | Ánh xạ chuỗi vào [0,1), tiệm cận entropy | Cao nhất (lossless) |
| **DCT (JPEG)** | Lossy | Biến đổi khối 8×8, lượng tử hóa | Cao (10:1 - 30:1) |
| **Wavelet (JPEG 2000)** | Lossy | Biến đổi toàn ảnh, đa phân giải | Cao, không artifact khối |
| **DPCM** | Lossy/Lossless | Mã hóa sai số dự đoán | Trung bình |

**Entropy (giới hạn Shannon):** $H = -Σ p(r)·log_2(p(r))$ bit/pixel là số bit tối thiểu cần thiết.

---

## Bài tập 1: Tính Entropy và đánh giá dư thừa

**Yêu cầu:**

1. Tính entropy của ảnh grayscale
2. Tính entropy của từng kênh màu (RGB)
3. So sánh entropy giữa ảnh tự nhiên và ảnh văn bản/đồ họa
4. Đánh giá mức độ dư thừa tiềm năng: $R = 1 - H / 8$ (với ảnh 8-bit)

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex1_entropy.py
import cv2
import numpy as np
import matplotlib.pyplot as plt
from collections import Counter
import math

def calculate_entropy(img):
    """
    Tính entropy của ảnh H = -Σ p(r)·log2(p(r))
    """
    # Đếm tần suất các mức xám
    hist = cv2.calcHist([img], [0], None, [256], [0, 256])
    hist = hist.flatten()
    prob = hist / np.sum(hist)
    
    # Loại bỏ xác suất = 0 để tránh log(0)
    prob = prob[prob > 0]
    entropy = -np.sum(prob * np.log2(prob))
    return entropy

def main():
    # Đọc ảnh grayscale
    img_gray = cv2.imread('images/sample.jpg', cv2.IMREAD_GRAYSCALE)
    if img_gray is None:
        print("Không thể đọc ảnh!")
        return
    
    # Đọc ảnh màu
    img_color = cv2.imread('images/sample.jpg')
    img_color = cv2.cvtColor(img_color, cv2.COLOR_BGR2RGB)
    
    # ---- 1. Entropy ảnh grayscale ----
    entropy_gray = calculate_entropy(img_gray)
    print("=" * 50)
    print("PHÂN TÍCH ENTROPY")
    print("=" * 50)
    print(f"Entropy ảnh grayscale: {entropy_gray:.4f} bit/pixel")
    print(f"Dư thừa tối đa (R): {1 - entropy_gray/8:.2%}")
    
    # ---- 2. Entropy từng kênh màu ----
    entropy_channels = []
    channel_names = ['R', 'G', 'B']
    for i in range(3):
        channel = img_color[:, :, i]
        ent = calculate_entropy(channel)
        entropy_channels.append(ent)
        print(f"Entropy kênh {channel_names[i]}: {ent:.4f} bit/pixel")
    
    # Entropy trung bình của ảnh màu
    avg_entropy_color = np.mean(entropy_channels)
    print(f"\nEntropy trung bình (3 kênh): {avg_entropy_color:.4f} bit/pixel")
    print(f"Tổng entropy (3 kênh): {sum(entropy_channels):.4f} bit/pixel")
    
    # ---- 3. Vẽ histogram và entropy ----
    plt.figure(figsize=(12, 6))
    plt.subplot(1, 2, 1)
    plt.hist(img_gray.ravel(), bins=256, range=[0, 256], color='black')
    plt.title(f'Histogram - Entropy = {entropy_gray:.3f} bit')
    plt.xlabel('Mức xám')
    plt.ylabel('Số pixel')
    
    plt.subplot(1, 2, 2)
    colors = ['red', 'green', 'blue']
    for i in range(3):
        plt.hist(img_color[:, :, i].ravel(), bins=256, range=[0, 256], 
                 color=colors[i], alpha=0.5, label=f'{channel_names[i]} (H={entropy_channels[i]:.2f})')
    plt.title('Histogram các kênh màu')
    plt.xlabel('Cường độ')
    plt.ylabel('Số pixel')
    plt.legend()
    plt.tight_layout()
    plt.show()
    
    # ---- 4. So sánh với ảnh văn bản (nếu có) ----
    try:
        img_text = cv2.imread('images/text_document.png', cv2.IMREAD_GRAYSCALE)
        if img_text is not None:
            entropy_text = calculate_entropy(img_text)
            print(f"\nEntropy ảnh văn bản: {entropy_text:.4f} bit/pixel")
            print(f"Dư thừa ảnh văn bản: {1 - entropy_text/8:.2%}")
    except:
        print("\n(Không tìm thấy ảnh văn bản để so sánh)")

if __name__ == "__main__":
    main()
```
</div>

**Câu hỏi kiểm tra:**
- Ảnh tự nhiên (thiên nhiên, chân dung) có entropy cao hơn hay thấp hơn ảnh đồ họa (logo, văn bản)? Giải thích.
- Mối quan hệ giữa entropy và khả năng nén là gì?

---

## Bài tập 2: Mã Huffman (Lossless)

**Yêu cầu:**

1. Xây dựng cây Huffman cho ảnh grayscale (các mức xám)
2. Mã hóa và giải mã một chuỗi pixel hoặc toàn bộ ảnh
3. Tính chiều dài mã trung bình và so sánh với entropy
4. Lưu bảng mã để có thể giải mã sau

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex2_huffman.py
import cv2
import numpy as np
import heapq
from collections import defaultdict
import matplotlib.pyplot as plt

class HuffmanNode:
    def __init__(self, symbol=None, freq=0, left=None, right=None):
        self.symbol = symbol
        self.freq = freq
        self.left = left
        self.right = right
    
    def __lt__(self, other):
        return self.freq < other.freq

def build_huffman_tree(symbols, freq):
    """Xây dựng cây Huffman từ các ký hiệu và tần suất"""
    heap = []
    for sym, f in zip(symbols, freq):
        heapq.heappush(heap, HuffmanNode(symbol=sym, freq=f))
    
    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)
        merged = HuffmanNode(freq=left.freq + right.freq, left=left, right=right)
        heapq.heappush(heap, merged)
    
    return heap[0] if heap else None

def generate_codes(node, prefix="", code_map={}):
    """Sinh bảng mã Huffman từ cây"""
    if node is None:
        return code_map
    if node.symbol is not None:
        code_map[node.symbol] = prefix
    else:
        generate_codes(node.left, prefix + "0", code_map)
        generate_codes(node.right, prefix + "1", code_map)
    return code_map

def encode_image(img):
    """Mã hóa ảnh bằng Huffman"""
    # Tính tần suất các mức xám
    hist = cv2.calcHist([img], [0], None, [256], [0, 256])
    hist = hist.flatten()
    symbols = np.where(hist > 0)[0]
    freq = hist[symbols]
    
    # Xây dựng cây Huffman
    tree = build_huffman_tree(symbols, freq)
    code_map = generate_codes(tree)
    
    # Mã hóa từng pixel
    encoded_bits = []
    for pixel in img.flatten():
        encoded_bits.append(code_map[pixel])
    
    return code_map, ''.join(encoded_bits), tree

def decode_image(encoded_bits, tree, shape):
    """Giải mã ảnh từ chuỗi bit"""
    decoded_pixels = []
    node = tree
    for bit in encoded_bits:
        if bit == '0':
            node = node.left
        else:
            node = node.right
        if node.symbol is not None:
            decoded_pixels.append(node.symbol)
            node = tree
    
    return np.array(decoded_pixels).reshape(shape)

def calculate_avg_code_length(code_map, hist):
    """Tính chiều dài mã trung bình"""
    total_pixels = np.sum(hist)
    avg_len = 0
    for symbol, code in code_map.items():
        prob = hist[symbol] / total_pixels
        avg_len += prob * len(code)
    return avg_len

def main():
    img = cv2.imread('images/sample.jpg', cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("Không thể đọc ảnh!")
        return
    
    # ---- Mã hóa ----
    code_map, encoded_bits, tree = encode_image(img)
    
    # ---- Phân tích ----
    hist = cv2.calcHist([img], [0], None, [256], [0, 256]).flatten()
    entropy = -np.sum((hist[hist>0] / np.sum(hist)) * np.log2(hist[hist>0] / np.sum(hist)))
    avg_code_len = calculate_avg_code_length(code_map, hist)
    compression_ratio = 8 / avg_code_len
    
    print("=" * 50)
    print("MÃ HUFFMAN")
    print("=" * 50)
    print(f"Số mức xám khác nhau: {len(code_map)}")
    print(f"Entropy (giới hạn): {entropy:.4f} bit/pixel")
    print(f"Chiều dài mã TB: {avg_code_len:.4f} bit/pixel")
    print(f"Tỷ lệ nén (so với 8-bit): {compression_ratio:.2f}:1")
    print(f"Kích thước gốc: {img.size * 8} bits")
    print(f"Kích thước nén: {len(encoded_bits)} bits")
    
    # ---- Giải mã ----
    decoded = decode_image(encoded_bits, tree, img.shape)
    
    # ---- Hiển thị ----
    plt.figure(figsize=(12, 5))
    plt.subplot(1, 2, 1)
    plt.imshow(img, cmap='gray')
    plt.title('Ảnh gốc')
    plt.axis('off')
    
    plt.subplot(1, 2, 2)
    plt.imshow(decoded, cmap='gray')
    plt.title('Ảnh giải mã (Huffman)')
    plt.axis('off')
    plt.show()
    
    # Lưu bảng mã (mô phỏng)
    with open('output/huffman_codes.txt', 'w') as f:
        for symbol, code in sorted(code_map.items()):
            f.write(f"{symbol:3d}: {code}\n")
    print("Đã lưu bảng mã tại output/huffman_codes.txt")

if __name__ == "__main__":
    main()
```
</div>

**Câu hỏi kiểm tra:**
- Nếu ảnh có 256 mức xám với phân bố đều, chiều dài mã Huffman xấp xỉ bao nhiêu? Giải thích.
- Huffman có đạt được entropy không? Vì sao?

---

## Bài tập 3: Mã hóa RLE (Run-Length Encoding) và LZW

**Yêu cầu:**

1. Triển khai RLE cho ảnh nhị phân và ảnh grayscale
2. So sánh hiệu quả RLE trên hai loại ảnh
3. Triển khai LZW và áp dụng cho ảnh grayscale (các mức xám)
4. Tính tỷ lệ nén của cả hai phương pháp

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex3_rle_lzw.py
import cv2
import numpy as np
import matplotlib.pyplot as plt

def rle_encode(data):
    """Mã hóa RLE cho dãy số"""
    if len(data) == 0:
        return []
    encoded = []
    count = 1
    prev = data[0]
    for i in range(1, len(data)):
        if data[i] == prev:
            count += 1
        else:
            encoded.append((prev, count))
            prev = data[i]
            count = 1
    encoded.append((prev, count))
    return encoded

def rle_decode(encoded):
    """Giải mã RLE"""
    decoded = []
    for value, count in encoded:
        decoded.extend([value] * count)
    return np.array(decoded)

def lzw_encode(data, max_dict_size=4096):
    """Mã hóa LZW"""
    dict_size = 256
    dictionary = {chr(i): i for i in range(dict_size)}
    
    w = ""
    result = []
    for c in data:
        wc = w + c
        if wc in dictionary and len(dictionary) < max_dict_size:
            w = wc
        else:
            result.append(dictionary[w])
            if len(dictionary) < max_dict_size:
                dictionary[wc] = dict_size
                dict_size += 1
            w = c
    
    if w:
        result.append(dictionary[w])
    return result

def lzw_decode(encoded):
    """Giải mã LZW"""
    dict_size = 256
    dictionary = {i: chr(i) for i in range(dict_size)}
    
    w = chr(encoded[0])
    result = [w]
    
    for k in encoded[1:]:
        if k in dictionary:
            entry = dictionary[k]
        elif k == dict_size:
            entry = w + w[0]
        else:
            raise ValueError(f"Mã không hợp lệ: {k}")
        
        result.append(entry)
        dictionary[dict_size] = w + entry[0]
        dict_size += 1
        w = entry
    
    return ''.join(result)

def main():
    # Đọc ảnh grayscale
    img = cv2.imread('images/sample.jpg', cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("Không thể đọc ảnh!")
        return
    
    # Chuyển thành dãy pixel (dạng chuỗi cho LZW)
    pixel_values = img.flatten()
    
    # ---- RLE ----
    encoded_rle = rle_encode(pixel_values)
    decoded_rle = rle_decode(encoded_rle)
    decoded_rle = decoded_rle.astype(np.uint8).reshape(img.shape)
    
    # Tính tỷ lệ nén RLE
    size_original = pixel_values.size * 8  # 8-bit/pixel
    # Mỗi cặp (giá trị, độ dài): giá trị 8-bit + độ dài 16-bit = 24 bits
    size_rle = len(encoded_rle) * 24
    compression_ratio_rle = size_original / size_rle
    
    print("=" * 50)
    print("RLE COMPRESSION")
    print("=" * 50)
    print(f"Số cặp RLE: {len(encoded_rle)}")
    print(f"Tỷ lệ nén RLE: {compression_ratio_rle:.2f}:1")
    
    # ---- RLE trên ảnh nhị phân (binarize) ----
    _, binary = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)
    pixel_binary = binary.flatten()
    encoded_rle_bin = rle_encode(pixel_binary)
    size_rle_bin = len(encoded_rle_bin) * 24
    compression_ratio_rle_bin = pixel_binary.size * 8 / size_rle_bin
    print(f"RLE trên ảnh nhị phân: {compression_ratio_rle_bin:.2f}:1")
    
    # ---- LZW ----
    # Chuyển pixel thành ký tự để LZW xử lý (mỗi byte là 1 ký tự)
    pixel_chars = ''.join([chr(v) for v in pixel_values])
    lzw_encoded = lzw_encode(pixel_chars)
    
    # Tính tỷ lệ nén LZW (mỗi mã tối đa 12-bit)
    size_lzw = len(lzw_encoded) * 12
    compression_ratio_lzw = size_original / size_lzw
    
    print("\n" + "=" * 50)
    print("LZW COMPRESSION")
    print("=" * 50)
    print(f"Số mã LZW: {len(lzw_encoded)}")
    print(f"Tỷ lệ nén LZW: {compression_ratio_lzw:.2f}:1")
    
    # Giải mã LZW
    decoded_chars = lzw_decode(lzw_encoded)
    decoded_lzw = np.array([ord(c) for c in decoded_chars], dtype=np.uint8).reshape(img.shape)
    
    # ---- Hiển thị ----
    plt.figure(figsize=(15, 5))
    
    plt.subplot(1, 3, 1)
    plt.imshow(img, cmap='gray')
    plt.title('Gốc')
    plt.axis('off')
    
    plt.subplot(1, 3, 2)
    plt.imshow(decoded_rle, cmap='gray')
    plt.title(f'RLE {compression_ratio_rle:.1f}:1')
    plt.axis('off')
    
    plt.subplot(1, 3, 3)
    plt.imshow(decoded_lzw, cmap='gray')
    plt.title(f'LZW {compression_ratio_lzw:.1f}:1')
    plt.axis('off')
    
    plt.tight_layout()
    plt.show()
    
    print("\nĐã hoàn thành RLE và LZW.")

if __name__ == "__main__":
    main()
```
</div>

**Câu hỏi kiểm tra:**
- Tại sao RLE hiệu quả hơn trên ảnh nhị phân?
- So sánh ưu/nhược điểm của Huffman và LZW.

---

## Bài tập 4: Mã hóa số học (Arithmetic Coding) - Mô phỏng

**Yêu cầu:**
- Cài đặt mã hóa số học cho một chuỗi ký tự
- Giải thích quá trình thu hẹp khoảng và chọn giá trị
- Tính số bit cần thiết so với entropy

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex4_arithmetic.py
import math

def arithmetic_encode(message, probs):
    """
    Mã hóa số học chuỗi message với bảng xác suất probs
    Trả về giá trị thực trong khoảng [0,1) đại diện cho chuỗi
    """
    low, high = 0.0, 1.0
    
    # Lưu lịch sử các khoảng để giải thích
    steps = []
    steps.append((low, high, "Khởi tạo"))
    
    for char in message:
        range_size = high - low
        cum_prob = 0
        
        for c, p in probs.items():
            if c == char:
                new_low = low + range_size * cum_prob
                new_high = low + range_size * (cum_prob + p)
                low, high = new_low, new_high
                steps.append((low, high, f"'{char}'"))
                break
            cum_prob += p
    
    # Chọn giá trị đại diện
    code = (low + high) / 2
    return code, steps

def arithmetic_decode(code, probs, length):
    """
    Giải mã số học từ code, với số ký tự length
    """
    low, high = 0.0, 1.0
    decoded = []
    
    for _ in range(length):
        range_size = high - low
        cum_prob = 0
        normalized = (code - low) / range_size
        
        for c, p in probs.items():
            if normalized <= cum_prob + p:
                decoded.append(c)
                new_low = low + range_size * cum_prob
                new_high = low + range_size * (cum_prob + p)
                low, high = new_low, new_high
                break
            cum_prob += p
    
    return ''.join(decoded)

def entropy(probs):
    """Tính entropy từ bảng xác suất"""
    return -sum(p * math.log2(p) for p in probs.values() if p > 0)

def main():
    # Bảng xác suất
    probs = {
        'A': 0.5,
        'B': 0.3,
        'C': 0.2
    }
    
    message = "AB"
    
    print("=" * 50)
    print("MÃ HÓA SỐ HỌC")
    print("=" * 50)
    print(f"Bảng xác suất: {probs}")
    print(f"Chuỗi cần mã hóa: '{message}'")
    print(f"Entropy: {entropy(probs):.4f} bit/ký tự")
    
    # Mã hóa
    code, steps = arithmetic_encode(message, probs)
    print(f"\nGiá trị mã hóa: {code:.6f}")
    
    print("\nQuá trình thu hẹp khoảng:")
    for low, high, symbol in steps:
        print(f"  {symbol:8s}: [{low:.4f}, {high:.4f})")
    
    # Giải mã
    decoded = arithmetic_decode(code, probs, len(message))
    print(f"\nGiải mã: '{decoded}'")
    
    # Số bit cần thiết
    bits_needed = math.ceil(-math.log2(code - steps[-1][1] + steps[-1][0]))
    print(f"Số bit cần để biểu diễn: {bits_needed} bit")
    print(f"Hiệu quả so với mã hóa nhị phân cố định (2 bit/ký tự): {2*len(message)} -> {bits_needed} bit")

if __name__ == "__main__":
    main()
```
</div>

---

## Bài tập 5: Nén DCT khối (Mô phỏng JPEG cơ bản)

**Yêu cầu:**

1. Chia ảnh thành các khối 8×8
2. Thực hiện DCT trên mỗi khối
3. Lượng tử hóa các hệ số DCT bằng bảng lượng tử JPEG
4. Quét Zigzag và so sánh số hệ số khác 0
5. Khôi phục ảnh bằng IDCT và đánh giá chất lượng

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex5_dct_block.py
import cv2
import numpy as np
from scipy.fftpack import dct, idct
import matplotlib.pyplot as plt

def dct2(block):
    """DCT 2D"""
    return dct(dct(block.T, norm='ortho').T, norm='ortho')

def idct2(block):
    """IDCT 2D"""
    return idct(idct(block.T, norm='ortho').T, norm='ortho')

def zigzag_scan(matrix):
    """Quét Zigzag ma trận 8x8"""
    h, w = matrix.shape
    zigzag = []
    for s in range(h + w - 1):
        if s % 2 == 0:
            # Đường chéo chẵn: đi lên
            i, j = min(s, h-1), max(0, s-h+1)
            while i >= 0 and j < w:
                zigzag.append(matrix[i, j])
                i -= 1
                j += 1
        else:
            # Đường chéo lẻ: đi xuống
            i, j = max(0, s-w+1), min(s, w-1)
            while i < h and j >= 0:
                zigzag.append(matrix[i, j])
                i += 1
                j -= 1
    return np.array(zigzag)

def zigzag_inverse(zigzag, shape=(8, 8)):
    """Khôi phục ma trận từ quét Zigzag"""
    h, w = shape
    matrix = np.zeros(shape)
    idx = 0
    for s in range(h + w - 1):
        if s % 2 == 0:
            i, j = min(s, h-1), max(0, s-h+1)
            while i >= 0 and j < w:
                matrix[i, j] = zigzag[idx]
                idx += 1
                i -= 1
                j += 1
        else:
            i, j = max(0, s-w+1), min(s, w-1)
            while i < h and j >= 0:
                matrix[i, j] = zigzag[idx]
                idx += 1
                i += 1
                j -= 1
    return matrix

# Bảng lượng tử hóa JPEG (chất lượng ~50%)
Q_TABLE = np.array([
    [16, 11, 10, 16, 24, 40, 51, 61],
    [12, 12, 14, 19, 26, 58, 60, 55],
    [14, 13, 16, 24, 40, 57, 69, 56],
    [14, 17, 22, 29, 51, 87, 80, 62],
    [18, 22, 37, 56, 68, 109, 103, 77],
    [24, 35, 55, 64, 81, 104, 113, 92],
    [49, 64, 78, 87, 103, 121, 120, 101],
    [72, 92, 95, 98, 112, 100, 103, 99]
])

def compress_block_dct(block, quality=50):
    """Nén một khối 8x8 bằng DCT và lượng tử hóa"""
    # DCT
    dct_block = dct2(block.astype(np.float32))
    
    # Lượng tử hóa (điều chỉnh theo quality)
    scale = max(1, quality / 50)
    q_scale = Q_TABLE * scale
    quantized = np.round(dct_block / q_scale)
    
    return quantized, q_scale

def decompress_block_dct(quantized, q_scale):
    """Giải nén khối 8x8"""
    # Giải lượng tử
    dct_block = quantized * q_scale
    # IDCT
    block = idct2(dct_block)
    return np.clip(block, 0, 255).astype(np.uint8)

def main():
    img = cv2.imread('images/sample.jpg', cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("Không thể đọc ảnh!")
        return
    
    h, w = img.shape
    # Cắt ảnh thành bội số của 8
    h_crop = h - h % 8
    w_crop = w - w % 8
    img_crop = img[:h_crop, :w_crop]
    
    compressed = np.zeros_like(img_crop, dtype=np.float32)
    nonzero_count = 0
    total_coeff = 0
    
    # Nén từng khối
    for i in range(0, h_crop, 8):
        for j in range(0, w_crop, 8):
            block = img_crop[i:i+8, j:j+8]
            quantized, q_scale = compress_block_dct(block, quality=40)
            
            # Đếm số hệ số khác 0
            total_coeff += 64
            nonzero_count += np.count_nonzero(quantized)
            
            # Giải nén khối
            decompressed = decompress_block_dct(quantized, q_scale)
            compressed[i:i+8, j:j+8] = decompressed
    
    compressed = compressed.astype(np.uint8)
    
    # Tính toán thống kê
    compression_ratio = total_coeff / nonzero_count
    mse = np.mean((img_crop.astype(float) - compressed.astype(float))**2)
    psnr = 20 * np.log10(255 / np.sqrt(mse))
    
    print("=" * 50)
    print("NÉN DCT KHỐI (MÔ PHỎNG JPEG)")
    print("=" * 50)
    print(f"Tổng số hệ số DCT: {total_coeff}")
    print(f"Số hệ số khác 0 sau lượng tử: {nonzero_count}")
    print(f"Tỷ lệ nén (hệ số): {compression_ratio:.2f}:1")
    print(f"PSNR: {psnr:.2f} dB")
    
    # ---- Hiển thị ----
    plt.figure(figsize=(12, 6))
    plt.subplot(1, 2, 1)
    plt.imshow(img_crop, cmap='gray')
    plt.title('Ảnh gốc (cropped)')
    plt.axis('off')
    
    plt.subplot(1, 2, 2)
    plt.imshow(compressed, cmap='gray')
    plt.title(f'DCT nén (PSNR={psnr:.1f} dB)\nHệ số còn: {nonzero_count}/{total_coeff}')
    plt.axis('off')
    plt.show()
    
    cv2.imwrite('output/dct_compressed.jpg', compressed)
    print("\nĐã lưu ảnh nén DCT tại output/dct_compressed.jpg")

if __name__ == "__main__":
    main()
```
</div>

---

## Bài tập 6: Nén JPEG với OpenCV và đánh giá chất lượng

**Yêu cầu:**

1. Lưu ảnh với các mức chất lượng JPEG khác nhau (1, 10, 30, 50, 70, 90, 100)
2. Tính PSNR và SSIM cho từng mức
3. Vẽ biểu đồ so sánh chất lượng và kích thước file
4. Quan sát hiện tượng blocking artifact ở mức chất lượng thấp

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex6_jpeg_quality.py
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage.metrics import structural_similarity as ssim
import os

def calculate_psnr(original, compressed):
    mse = np.mean((original.astype(float) - compressed.astype(float))**2)
    if mse == 0:
        return float('inf')
    return 20 * np.log10(255.0 / np.sqrt(mse))

def main():
    img = cv2.imread('images/sample.jpg')
    if img is None:
        print("Không thể đọc ảnh!")
        return
    
    # Chuyển sang grayscale để so sánh
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Các mức chất lượng
    qualities = [1, 10, 30, 50, 70, 90, 100]
    psnr_values = []
    ssim_values = []
    file_sizes = []
    
    output_dir = 'output/jpeg_quality/'
    os.makedirs(output_dir, exist_ok=True)
    
    for q in qualities:
        # Lưu ảnh JPEG với chất lượng q
        filename = f'{output_dir}quality_{q}.jpg'
        cv2.imwrite(filename, img, [cv2.IMWRITE_JPEG_QUALITY, q])
        
        # Đọc lại ảnh đã nén
        compressed = cv2.imread(filename)
        compressed_gray = cv2.cvtColor(compressed, cv2.COLOR_BGR2GRAY)
        
        # Tính PSNR
        psnr = calculate_psnr(img_gray, compressed_gray)
        psnr_values.append(psnr)
        
        # Tính SSIM
        ssim_val = ssim(img_gray, compressed_gray, data_range=255)
        ssim_values.append(ssim_val)
        
        # Kích thước file
        file_size = os.path.getsize(filename) / 1024  # KB
        file_sizes.append(file_size)
        
        print(f"Quality {q:3d}: PSNR={psnr:.2f} dB, SSIM={ssim_val:.4f}, Size={file_size:.1f} KB")
    
    # ---- Vẽ biểu đồ ----
    fig, axes = plt.subplots(1, 3, figsize=(15, 5))
    
    axes[0].plot(qualities, psnr_values, 'bo-', linewidth=2, markersize=8)
    axes[0].set_xlabel('Chất lượng JPEG')
    axes[0].set_ylabel('PSNR (dB)')
    axes[0].set_title('PSNR theo chất lượng')
    axes[0].grid(True)
    
    axes[1].plot(qualities, ssim_values, 'ro-', linewidth=2, markersize=8)
    axes[1].set_xlabel('Chất lượng JPEG')
    axes[1].set_ylabel('SSIM')
    axes[1].set_title('SSIM theo chất lượng')
    axes[1].grid(True)
    
    axes[2].plot(qualities, file_sizes, 'go-', linewidth=2, markersize=8)
    axes[2].set_xlabel('Chất lượng JPEG')
    axes[2].set_ylabel('Kích thước (KB)')
    axes[2].set_title('Kích thước file theo chất lượng')
    axes[2].grid(True)
    
    plt.tight_layout()
    plt.show()
    
    # ---- Hiển thị ảnh ở các mức chất lượng ----
    fig, axes = plt.subplots(2, 4, figsize=(15, 8))
    axes = axes.flatten()
    
    # Ảnh gốc
    axes[0].imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    axes[0].set_title('Gốc')
    axes[0].axis('off')
    
    # Các mức chất lượng tiêu biểu
    display_qualities = [10, 30, 50, 70, 90, 100]
    for i, q in enumerate(display_qualities):
        filename = f'{output_dir}quality_{q}.jpg'
        compressed = cv2.imread(filename)
        axes[i+1].imshow(cv2.cvtColor(compressed, cv2.COLOR_BGR2RGB))
        axes[i+1].set_title(f'Q={q}\nPSNR={psnr_values[qualities.index(q)]:.1f}dB')
        axes[i+1].axis('off')
    
    plt.tight_layout()
    plt.show()
    
    print(f"\nKết quả lưu tại thư mục: {output_dir}")

if __name__ == "__main__":
    main()
```
</div>

**Câu hỏi kiểm tra:**
- Với quality = 30, có thể quan sát artifact gì? Giải thích nguyên nhân.
- Giữa PSNR và SSIM, chỉ số nào phản ánh tốt hơn chất lượng cảm nhận? Vì sao?

---

## Bài tập 7: Nén Wavelet (JPEG 2000 cơ bản)

**Yêu cầu:**

1. Thực hiện biến đổi Wavelet rời rạc (DWT) trên ảnh bằng `pywt`
2. Giữ lại các hệ số lớn (thresholding) và bỏ qua hệ số nhỏ
3. Khôi phục ảnh bằng IDWT với các tỉ lệ giữ khác nhau (10%, 20%, 50%)
4. So sánh chất lượng với DCT/JPEG

<div style="display: none;">

**Hướng dẫn:**

```python
# src/ex7_wavelet.py
import cv2
import numpy as np
import pywt
import matplotlib.pyplot as plt
from skimage.metrics import structural_similarity as ssim

def calculate_psnr(original, compressed):
    mse = np.mean((original.astype(float) - compressed.astype(float))**2)
    if mse == 0:
        return float('inf')
    return 20 * np.log10(255.0 / np.sqrt(mse))

def wavelet_compress(img, keep_ratio=0.1, wavelet='db1'):
    """
    Nén ảnh bằng Wavelet: giữ lại keep_ratio % hệ số lớn nhất
    """
    # DWT 2D
    coeffs = pywt.dwt2(img, wavelet)
    cA, (cH, cV, cD) = coeffs
    
    # Gom tất cả hệ số
    coeff_array = np.concatenate([cA.ravel(), cH.ravel(), cV.ravel(), cD.ravel()])
    
    # Tìm ngưỡng (giữ keep_ratio % hệ số lớn nhất)
    threshold = np.percentile(np.abs(coeff_array), 100 - keep_ratio * 100)
    
    # Làm mịn các hệ số (giữ lại hệ số > threshold)
    cA_thresh = cA * (np.abs(cA) >= threshold)
    cH_thresh = cH * (np.abs(cH) >= threshold)
    cV_thresh = cV * (np.abs(cV) >= threshold)
    cD_thresh = cD * (np.abs(cD) >= threshold)
    
    # IDWT
    coeffs_thresh = (cA_thresh, (cH_thresh, cV_thresh, cD_thresh))
    reconstructed = pywt.idwt2(coeffs_thresh, wavelet)
    
    return reconstructed, np.count_nonzero(coeff_array >= threshold) / len(coeff_array)

def main():
    img = cv2.imread('images/sample.jpg', cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("Không thể đọc ảnh!")
        return
    
    # Cắt ảnh thành kích thước chẵn cho DWT
    h, w = img.shape
    img_crop = img[:h - h % 2, :w - w % 2]
    
    # Các tỉ lệ giữ
    keep_ratios = [0.05, 0.10, 0.20, 0.50, 0.80]
    
    print("=" * 50)
    print("NÉN WAVELET (DWT + THRESHOLDING)")
    print("=" * 50)
    
    plt.figure(figsize=(15, 8))
    
    # Hiển thị ảnh gốc
    plt.subplot(2, 3, 1)
    plt.imshow(img_crop, cmap='gray')
    plt.title('Gốc')
    plt.axis('off')
    
    psnr_values = []
    ssim_values = []
    ratios = []
    
    for idx, keep_ratio in enumerate(keep_ratios):
        reconstructed, actual_ratio = wavelet_compress(img_crop, keep_ratio, wavelet='db2')
        reconstructed = np.clip(reconstructed, 0, 255).astype(np.uint8)
        
        psnr = calculate_psnr(img_crop, reconstructed)
        ssim_val = ssim(img_crop, reconstructed, data_range=255)
        psnr_values.append(psnr)
        ssim_values.append(ssim_val)
        ratios.append(actual_ratio * 100)
        
        # Lưu ảnh
        cv2.imwrite(f'output/wavelet_keep_{int(keep_ratio*100)}.jpg', reconstructed)
        
        print(f"Giữ {keep_ratio*100:.0f}% (thực tế {actual_ratio*100:.1f}%): PSNR={psnr:.2f} dB, SSIM={ssim_val:.4f}")
        
        # Hiển thị
        plt.subplot(2, 3, idx+2)
        plt.imshow(reconstructed, cmap='gray')
        plt.title(f'Giữ {keep_ratio*100:.0f}%\nPSNR={psnr:.1f}dB')
        plt.axis('off')
    
    plt.tight_layout()
    plt.show()
    
    # ---- Vẽ biểu đồ so sánh ----
    fig, axes = plt.subplots(1, 2, figsize=(12, 5))
    
    axes[0].plot(keep_ratios, psnr_values, 'bo-', linewidth=2, markersize=8)
    axes[0].set_xlabel('Tỉ lệ giữ hệ số')
    axes[0].set_ylabel('PSNR (dB)')
    axes[0].set_title('PSNR theo tỉ lệ giữ')
    axes[0].grid(True)
    
    axes[1].plot(keep_ratios, ssim_values, 'ro-', linewidth=2, markersize=8)
    axes[1].set_xlabel('Tỉ lệ giữ hệ số')
    axes[1].set_ylabel('SSIM')
    axes[1].set_title('SSIM theo tỉ lệ giữ')
    axes[1].grid(True)
    
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    main()
```
</div>

---

## Bài tập nâng cao (Tự chọn)

### Bài 8: Triển khai DPCM (Differential Pulse Code Modulation)
- Viết hàm dự đoán pixel theo hàng (predictor = pixel trái hoặc pixel trên)
- Mã hóa sai số dự đoán và áp dụng lượng tử hóa (lossy DPCM)
- So sánh với mã hóa trực tiếp

### Bài 9: So sánh JPEG vs JPEG 2000
- Lưu ảnh với `cv2.imwrite(..., [cv2.IMWRITE_JPEG2000_COMPRESSION_X1000, quality])`
- So sánh artifact (blocking vs smoothing) ở cùng tỷ lệ nén

### Bài 10: Xây dựng bộ mã hóa Huffman thích ứng
- Cập nhật bảng mã dựa trên ngữ cảnh (context-adaptive)
- So sánh hiệu quả với Huffman tĩnh
