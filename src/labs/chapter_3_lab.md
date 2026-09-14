# Bài tập thực hành chương 3

---


## 1. Đo lường & đánh giá

---


### 1.1. Entropy — Đo lượng tin trung bình
**📌 Bài tập 1:**
Cho 3 ảnh khác nhau về mức độ phức tạp: `data.camera()`, `data.coins()`, và ảnh hằng số `np.ones((256, 256)) * 128`. Tính entropy của mỗi ảnh và rút ra nhận xét về mối liên hệ giữa entropy và độ phức tạp ảnh.

```python
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Hàm tính entropy
def calculate_entropy(img):
    """
    Tính entropy của ảnh xám theo công thức:
    H = -Σ p(r_k) · log2(p(r_k))
    - p(r_k): xác suất xuất hiện mức xám r_k
    """
    # Histogram + xác suất
    hist, _ = np.histogram(img.flatten(), 256, [0, 256])
    p = hist / img.size
    # Bỏ các p = 0 để tránh log(0)
    p = p[p > 0]
    return -np.sum(p * np.log2(p))

# 2. Chuẩn bị 3 ảnh
img_cam  = data.camera()                                   # phức tạp
img_coin = data.coins()                                    # trung bình
img_flat = (np.ones((256, 256)) * 128).astype(np.uint8)    # hằng số

imgs  = [img_cam, img_coin, img_flat]
names = ['Camera (phức tạp)', 'Coins (trung bình)', 'Hằng số 128']

# 3. Tính entropy
print(f"{'Ảnh':<25}{'Entropy (bit/pixel)':>22}")
print("-" * 47)
for name, im in zip(names, imgs):
    print(f"{name:<25}{calculate_entropy(im):>22.4f}")

# 4. Hiển thị ảnh + histogram
fig, axes = plt.subplots(2, 3, figsize=(15, 9))
for i, (im, name) in enumerate(zip(imgs, names)):
    h = calculate_entropy(im)
    axes[0, i].imshow(im, cmap='gray')
    axes[0, i].set_title(f'{name}\nH = {h:.3f} bit/px')
    axes[0, i].axis('off')
    axes[1, i].hist(im.ravel(), 256, [0, 256], color='gray')
    axes[1, i].set_title('Histogram')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Ảnh hằng số: **H = 0** (không có bất định, chỉ 1 mức xám duy nhất).
- Ảnh camera/coins: **H cao (6–8 bit)**, phân bố mức xám đa dạng.
- **Định lý Shannon:** entropy là giới hạn dưới của số bit trung bình/pixel → không thể nén dưới ngưỡng này mà không mất thông tin.

---


### 1.2. Tỷ lệ nén và Dư thừa
**📌 Bài tập 2:**
Cho ảnh xám 8-bit kích thước 512×512. Giả sử dùng các phương pháp nén cho ra tỷ lệ nén `C ∈ {2, 5, 10, 20}`. Tính `b'`, `C`, và `R = 1 - 1/C` cho mỗi trường hợp. Vẽ biểu đồ cột so sánh `R`.

```python
import numpy as np
import matplotlib.pyplot as plt

# 1. Ảnh giả định 512×512, 8-bit
M, N = 512, 512
b = M * N * 8
print(f"Số bit gốc b = {b:,} bit = {b/8/1024:.1f} KB\n")

# 2. Các tỷ lệ nén giả định
C_list = [2, 5, 10, 20]

# 3. In bảng: b', C, R
print(f"{'C giả định':>12}{'b\\' (bit)':>15}{'C tính':>12}{'R = 1 - 1/C':>16}")
print("-" * 55)
for C in C_list:
    b_prime = b // C
    C_calc  = b / b_prime
    R       = 1 - 1 / C_calc
    print(f"{C:>12}{b_prime:>15,}{C_calc:>12.2f}{R:>16.4f}")

# 4. Biểu đồ cột
fig, ax = plt.subplots(figsize=(9, 5))
R_vals = [1 - 1/C for C in C_list]
bars = ax.bar([f'C={c}:1' for c in C_list], R_vals,
              color=['#8ecae6', '#219ebc', '#fb8500', '#d62828'])
for bar, r in zip(bars, R_vals):
    ax.text(bar.get_x() + bar.get_width()/2, r + 0.01,
            f'{r:.3f}', ha='center', fontsize=11)
ax.set_ylim(0, 1.05)
ax.set_ylabel('Dư thừa R')
ax.set_title('Dư thừa R theo tỷ lệ nén C')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- `C=2` → `R=0.5` (50% dữ liệu dư thừa).
- `C=20` → `R=0.95` (95% dữ liệu dư thừa).
- **R càng lớn → càng nhiều dư thừa có thể loại bỏ.**

---


### 1.3. Đo lường chất lượng — RMSE & SNR
**📌 Bài tập 3:**
Cho ảnh `data.camera()`. Tạo 3 phiên bản "nén giả" bằng cách lượng tử hóa xuống 7-bit, 5-bit, 3-bit. Tính RMSE và SNR của mỗi phiên bản so với ảnh gốc.

```python
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Hàm đo lường
def calculate_rmse(orig, comp):
    """RMSE — căn bậc 2 của MSE."""
    return np.sqrt(np.mean((orig.astype(np.float32) -
                            comp.astype(np.float32)) ** 2))

def calculate_snr(orig, comp):
    """SNR (dB) = 10·log10(signal_power / noise_power)."""
    signal_power = np.mean(orig.astype(np.float32) ** 2)
    noise_power  = np.mean((orig.astype(np.float32) -
                            comp.astype(np.float32)) ** 2)
    if noise_power == 0:
        return float('inf')
    return 10 * np.log10(signal_power / noise_power)

# 2. Hàm lượng tử hóa xuống b bit
def quantize_bits(img, bits):
    step = 256 // (2 ** bits)
    return ((img // step) * step).astype(np.uint8)

# 3. Tạo 3 phiên bản
img = data.camera()
bits_list = [7, 5, 3]
versions  = [quantize_bits(img, b) for b in bits_list]

# 4. In bảng
print(f"{'Phiên bản':<15}{'RMSE':>12}{'SNR (dB)':>14}")
print("-" * 41)
print(f"{'Ảnh gốc':<15}{0:>12.4f}{'∞':>14}")
for b, v in zip(bits_list, versions):
    print(f"{b}-bit{'':<10}{calculate_rmse(img, v):>12.4f}"
          f"{calculate_snr(img, v):>14.2f}")

# 5. Hiển thị
fig, axes = plt.subplots(1, 4, figsize=(18, 5))
axes[0].imshow(img, cmap='gray'); axes[0].set_title('Ảnh gốc 8-bit')
for i, (b, v) in enumerate(zip(bits_list, versions)):
    axes[i+1].imshow(v, cmap='gray')
    axes[i+1].set_title(f'{b}-bit\nRMSE={calculate_rmse(img, v):.2f}')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Số bit càng giảm → RMSE càng tăng, SNR càng giảm.
- **SNR > 30 dB** → chất lượng tốt; **SNR < 20 dB** → mắt thường thấy rõ suy giảm.

---


## 2. Nén không tổn thất (Lossless)

---


### 2.1. Mã Huffman
**📌 Bài tập 4:**
Cài đặt thuật toán Huffman từ đầu. Áp dụng cho chuỗi `"aabbc"` và chuỗi `"Cộng hoà xã hội chủ nghĩa"`. In bảng mã, tính số bit trung bình và entropy của nguồn.

```python
import numpy as np
import matplotlib.pyplot as plt
from collections import Counter
import heapq

# 1. Class Node cho cây Huffman
class Node:
    def __init__(self, char, freq):
        self.char  = char
        self.freq  = freq
        self.left  = None
        self.right = None
    def __lt__(self, other):
        return self.freq < other.freq

# 2. Xây dựng cây Huffman
def build_huffman_tree(text):
    freq = Counter(text)
    heap = [Node(c, f) for c, f in freq.items()]
    heapq.heapify(heap)
    while len(heap) > 1:
        left  = heapq.heappop(heap)
        right = heapq.heappop(heap)
        merged = Node(None, left.freq + right.freq)
        merged.left, merged.right = left, right
        heapq.heappush(heap, merged)
    return heap[0]

# 3. Sinh mã từ cây
def generate_codes(node, prefix="", code_map=None):
    if code_map is None:
        code_map = {}
    if node is not None:
        if node.char is not None:
            code_map[node.char] = prefix
        generate_codes(node.left,  prefix + "0", code_map)
        generate_codes(node.right, prefix + "1", code_map)
    return code_map

# 4. Áp dụng cho 2 chuỗi
for text in ["aabbc", "Cộng hoà xã hội chủ nghĩa"]:
    print(f"\n=== Chuỗi: '{text}' (độ dài {len(text)}) ===")
    tree  = build_huffman_tree(text)
    codes = generate_codes(tree)

    # In bảng mã (sắp theo số bit)
    print(f"{'Ký tự':>8}{'Tần suất':>12}{'Mã':>10}{'Số bit':>10}")
    print("-" * 40)
    for ch, code in sorted(codes.items(), key=lambda x: len(x[1])):
        print(f"{repr(ch):>8}{text.count(ch):>12}{code:>10}{len(code):>10}")

    # Bit trung bình + entropy
    total_chars = len(text)
    avg_bits = sum(text.count(c) * len(codes[c]) for c in codes) / total_chars
    probs    = np.array([text.count(c) / total_chars for c in codes])
    entropy  = -np.sum(probs * np.log2(probs))

    print(f"\nBit trung bình/ký tự (Huffman): {avg_bits:.4f} bit")
    print(f"Entropy của nguồn              : {entropy:.4f} bit")
    print(f"Hiệu suất                      : {entropy/avg_bits*100:.2f}%")

# 5. Biểu đồ tần suất ký tự
text2 = "Cộng hoà xã hội chủ nghĩa"
freq  = Counter(text2)
plt.figure(figsize=(14, 5))
plt.bar(range(len(freq)), list(freq.values()), color='steelblue')
plt.xticks(range(len(freq)), [repr(c) for c in freq.keys()], rotation=90)
plt.title(f'Tần suất ký tự trong chuỗi "{text2}"')
plt.ylabel('Tần suất')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Ký tự xuất hiện nhiều (dấu cách, 'a', 'o') → **mã ngắn**.
- Ký tự hiếm → **mã dài**.
- **Hiệu suất gần 100%** → Huffman tiệm cận entropy (định lý Shannon).

---


### 2.2. Mã Golomb-Rice
**📌 Bài tập 5:**
Cài đặt Golomb-Rice code với tham số `k`. Mã hóa/giải mã các số `n ∈ {0, 1, 2, 3, 5, 13, 27, 100}` với `k=2`. So sánh số bit với mã nhị phân cố định 8-bit.

```python
# 1. Hàm mã hóa Golomb-Rice
def golomb_rice_encode(n, k):
    """
    Mã hóa Golomb-Rice:
    - M = 2^k
    - q = n // M (thương) → mã unary (q số 0 + 1 bit 1)
    - r = n % M (số dư)  → mã nhị phân k bit
    """
    M = 2 ** k
    q = n // M
    r = n % M
    quotient_bits  = '0' * q + '1'                # unary
    remainder_bits = f"{r:0{k}b}"                 # k bit
    return quotient_bits + remainder_bits

# 2. Hàm giải mã
def golomb_rice_decode(bits, k):
    """Giải mã Golomb-Rice."""
    # Đếm số bit 0 → q
    q = 0
    for bit in bits:
        if bit == '0':
            q += 1
        else:
            break
    # Đọc k bit tiếp theo → r
    r_bits = bits[q+1 : q+1+k]
    r = int(r_bits, 2)
    return q * (2 ** k) + r

# 3. Áp dụng
n_list = [0, 1, 2, 3, 5, 13, 27, 100]
k = 2

print(f"{'n':>5}{'q':>5}{'r':>5}{'Mã Golomb-Rice':>25}{'Số bit':>10}{'Giải mã':>10}")
print("-" * 60)
total_gr    = 0
total_fixed = 0
for n in n_list:
    code    = golomb_rice_encode(n, k)
    decoded = golomb_rice_decode(code, k)
    q = n // (2 ** k)
    r = n %  (2 ** k)
    print(f"{n:>5}{q:>5}{r:>5}{code:>25}{len(code):>10}{decoded:>10}")
    total_gr    += len(code)
    total_fixed += 8

print("-" * 60)
print(f"Tổng bit Golomb-Rice  : {total_gr} bit")
print(f"Tổng bit cố định 8-bit: {total_fixed} bit")
print(f"Tiết kiệm             : {(1-total_gr/total_fixed)*100:.1f}%")
```

**Kết quả mong đợi:**
- Với `k=2`: các số nhỏ (0, 1, 2, 3) mã rất ngắn (2–4 bit).
- Số lớn (100) mã dài (unary q=25 bit + 2 bit = ~27 bit).
- **Hiệu quả khi phân bố lệch về phía số nhỏ** (như sai số DPCM).

---


### 2.3. Mã số học (Arithmetic Coding)
**📌 Bài tập 6:**
Cài đặt mã hóa/giải mã số học cho bảng xác suất `{A:0.5, B:0.3, C:0.2}`. Áp dụng cho chuỗi `"A"`, `"AB"`, `"BAC"`, `"ABC"`. Kiểm tra round-trip.

```python
# 1. Mã hóa số học
def arithmetic_encode(message, probs):
    """
    Mã hóa số học:
    - Bắt đầu với khoảng [low, high) = [0, 1)
    - Với mỗi ký tự, thu hẹp khoảng theo xác suất của ký tự đó
    - Trả về giá trị đại diện (trung bình low + high)
    """
    low, high = 0.0, 1.0
    for char in message:
        range_size = high - low
        cum_prob = 0.0
        for c, p in probs.items():
            if c == char:
                high = low + range_size * (cum_prob + p)
                low  = low + range_size * cum_prob
                break
            cum_prob += p
    return (low + high) / 2

# 2. Giải mã số học
def arithmetic_decode(value, probs, n_chars):
    """
    Giải mã số học:
    - Với mỗi bước, xác định ký tự có khoảng con chứa value
    - Thu hẹp khoảng [low, high) về khoảng con đó
    - Lặp lại n_chars lần
    """
    low, high = 0.0, 1.0
    decoded = ""
    for _ in range(n_chars):
        range_size = high - low
        cum_prob = 0.0
        for c, p in probs.items():
            sub_low  = low + range_size * cum_prob
            sub_high = sub_low + range_size * p
            if sub_low <= value < sub_high:
                decoded += c
                low, high = sub_low, sub_high
                break
            cum_prob += p
    return decoded

# 3. Áp dụng
probs = {'A': 0.5, 'B': 0.3, 'C': 0.2}
messages = ["A", "AB", "BAC", "ABC"]

print(f"{'Chuỗi gốc':>12}{'Giá trị mã hóa':>20}{'Chuỗi giải mã':>18}{'Khớp?':>10}")
print("-" * 60)
for msg in messages:
    val     = arithmetic_encode(msg, probs)
    decoded = arithmetic_decode(val, probs, len(msg))
    print(f"{msg:>12}{val:>20.6f}{decoded:>18}{str(msg == decoded):>10}")
```

**Kết quả mong đợi:**
- Mỗi chuỗi được biểu diễn bởi **1 số thực duy nhất** trong [0, 1).
- **Round-trip thành công** — chuỗi giải mã khớp chuỗi gốc.
- Ưu điểm: vượt giới hạn 1 bit/ký tự của Huffman → tiệm cận entropy Shannon.

---


### 2.4. Mã LZW (Lempel-Ziv-Welch)
**📌 Bài tập 7:**
Cài đặt thuật toán LZW nén và giải nén. Áp dụng cho chuỗi `"ABAAABABA"` và `"TOBEORNOTTOBEORTOBEORNOT"`. In bảng quá trình mã hóa và kiểm tra round-trip.

```python
# 1. Hàm nén LZW
def lzw_compress(text):
    """
    Nén LZW:
    - Từ điển ban đầu: 256 ký tự ASCII (0-255)
    - Đọc từng ký tự, mở rộng chuỗi w cho đến khi gặp chuỗi mới
    - Xuất mã của w cũ, thêm w+c vào từ điển
    """
    dict_size  = 256
    dictionary = {chr(i): i for i in range(dict_size)}
    w = ""
    compressed = []
    steps = []
    for c in text:
        wc = w + c
        if wc in dictionary:
            w = wc                             # mở rộng w
        else:
            compressed.append(dictionary[w])   # xuất mã của w
            steps.append((w, c, dictionary[w], dict_size))
            dictionary[wc] = dict_size         # thêm wc vào từ điển
            dict_size += 1
            w = c                              # reset w = c
    if w:
        compressed.append(dictionary[w])
        steps.append((w, '', dictionary[w], None))
    return compressed, steps

# 2. Hàm giải nén LZW
def lzw_decompress(codes):
    """
    Giải nén LZW — bộ giải nén tự xây lại từ điển y hệt bộ nén.
    """
    dict_size  = 256
    dictionary = {i: chr(i) for i in range(dict_size)}
    result = []
    w = chr(codes[0])
    result.append(w)
    for k in codes[1:]:
        if k in dictionary:
            entry = dictionary[k]
        elif k == dict_size:
            entry = w + w[0]                   # trường hợp đặc biệt
        else:
            raise ValueError("Mã LZW không hợp lệ")
        result.append(entry)
        dictionary[dict_size] = w + entry[0]   # thêm vào từ điển
        dict_size += 1
        w = entry
    return "".join(result)

# 3. Áp dụng
texts = ["ABAAABABA", "TOBEORNOTTOBEORTOBEORNOT"]
for text in texts:
    codes, steps = lzw_compress(text)
    decoded = lzw_decompress(codes)
    print(f"\n=== Chuỗi: {text} ===")
    print(f"Chuỗi gốc : {text}")
    print(f"Mã LZW    : {codes}")
    print(f"Giải nén  : {decoded}")
    print(f"Round-trip: {text == decoded}")

    if text == "ABAAABABA":
        print("\nQuá trình mã hóa:")
        print(f"{'Bước':>5}{'w':>6}{'c':>5}{'Xuất':>10}{'Mã mới':>12}")
        print("-" * 40)
        for i, (w, c, out, new) in enumerate(steps, 1):
            new_str = f"{new}->{w+c}" if new else "-"
            print(f"{i:>5}{w:>6}{c:>5}{out:>10}{new_str:>12}")
```

**Kết quả mong đợi:**
- Chuỗi `"ABAAABABA"` (9 ký tự) → mã LZW ngắn hơn.
- **Round-trip thành công** — không cần gửi kèm từ điển (bộ giải nén tự xây lại).

---


### 2.5. Mã hóa Run-Length (RLE)
**📌 Bài tập 8:**
Cài đặt RLE cho ảnh nhị phân. Tạo ảnh nhị phân từ `data.camera()` (ngưỡng > 128). Áp dụng RLE, tính tỷ lệ nén, kiểm tra round-trip.

```python
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Hàm RLE encode
def rle_encode(arr):
    """Mã hóa mảng 1D thành danh sách (giá trị, độ dài)."""
    if len(arr) == 0:
        return []
    pairs = []
    cur_val = arr[0]
    count = 1
    for v in arr[1:]:
        if v == cur_val:
            count += 1
        else:
            pairs.append((cur_val, count))
            cur_val = v
            count = 1
    pairs.append((cur_val, count))
    return pairs

# 2. Hàm RLE decode
def rle_decode(pairs, shape):
    """Giải mã danh sách (giá trị, độ dài) thành mảng có shape cho trước."""
    flat = []
    for val, cnt in pairs:
        flat.extend([val] * cnt)
    return np.array(flat, dtype=np.uint8).reshape(shape)

# 3. Tạo ảnh nhị phân
img = data.camera()
binary = (img > 128).astype(np.uint8)

# 4. Nén
flat  = binary.flatten()
pairs = rle_encode(flat)

# Tỷ lệ nén — giả định: 1 bit giá trị + 8 bit độ dài mỗi cặp
bits_orig = len(flat) * 1
bits_rle  = len(pairs) * (1 + 8)
C = bits_orig / bits_rle
print(f"Kích thước gốc : {len(flat):,} pixel ({bits_orig:,} bit)")
print(f"Số cặp RLE     : {len(pairs):,} cặp ({bits_rle:,} bit)")
print(f"Tỷ lệ nén C    : {C:.2f}:1")
print(f"Dư thừa R      : {1 - 1/C:.4f}")

# 5. Round-trip
decoded = rle_decode(pairs, binary.shape)
print(f"Round-trip OK  : {np.array_equal(binary, decoded)}")

# 6. Hiển thị
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
axes[0].imshow(img, cmap='gray');       axes[0].set_title('Ảnh gốc (camera)')
axes[1].imshow(binary * 255, cmap='gray'); axes[1].set_title('Nhị phân (ngưỡng 128)')
axes[2].imshow(decoded * 255, cmap='gray'); axes[2].set_title('Sau RLE round-trip')
for ax in axes: ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- RLE hiệu quả khi có **nhiều pixel giống nhau liên tiếp**.
- Ảnh nhị phân (văn bản scan, fax) → RLE nén rất tốt.
- Ảnh tự nhiên (nhiều chi tiết) → RLE kém hiệu quả hơn.

---


### 2.6. Mã hóa Bit-Plane
**📌 Bài tập 9:**
Cho ảnh `data.camera()`. Tách 8 bit-plane. Áp dụng RLE cho từng bit-plane, tính tỷ lệ nén tương ứng. Rút ra nhận xét về bit-plane nào nén tốt nhất.

```python
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Hàm RLE (dùng lại từ bài tập 8)
def rle_encode(arr):
    if len(arr) == 0:
        return []
    pairs = []
    cur_val, count = arr[0], 1
    for v in arr[1:]:
        if v == cur_val:
            count += 1
        else:
            pairs.append((cur_val, count))
            cur_val, count = v, 1
    pairs.append((cur_val, count))
    return pairs

# 2. Tách 8 bit-plane
img = data.camera()
planes = [((img >> b) & 1).astype(np.uint8) for b in range(8)]

# 3. Áp dụng RLE cho từng bit-plane
print(f"{'Bit-plane':>10}{'Số pixel':>12}{'Số cặp RLE':>14}{'Tỷ lệ nén':>12}")
print("-" * 50)
for b, plane in enumerate(planes):
    pairs = rle_encode(plane.flatten())
    bits_orig = plane.size * 1
    bits_rle  = len(pairs) * 9
    C = bits_orig / bits_rle
    print(f"{b:>10}{plane.size:>12,}{len(pairs):>14,}{C:>12.2f}")

# 4. Hiển thị 8 bit-plane
fig, axes = plt.subplots(2, 4, figsize=(16, 8))
for i, p in enumerate(planes[::-1]):   # MSB → LSB
    ax = axes[i // 4, i % 4]
    ax.imshow(p * 255, cmap='gray')
    ax.set_title(f'Bit {7-i} (2^{7-i})')
    ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- **Bit 7 (MSB):** cấu trúc rõ ràng → RLE nén tốt.
- **Bit 0 (LSB):** gần như nhiễu ngẫu nhiên → RLE nén kém (thậm chí phình ra).
- **Ứng dụng:** trong JPEG 2000, bit-plane cao được ưu tiên, bit-plane thấp có thể bỏ để nén mạnh hơn.

---


## 3. Nén có tổn thất (Lossy)

---


### 3.1. Block Transform Coding — DCT cho khối 8×8
**📌 Bài tập 10:**
Cho ảnh `data.camera()`. Cắt một khối 8×8. Áp dụng DCT, lượng tử hóa với Q-table JPEG, giải lượng tử hóa + IDCT. Hiển thị khối gốc, hệ số DCT, Q-table, khối sau lượng tử hóa, khối tái tạo.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Lấy khối 8×8 từ vùng giữa
img = data.camera()
r, c = 200, 200
block = img[r:r+8, c:c+8].astype(np.float32)

# 2. DCT
dct_block = cv2.dct(block)

# 3. Q-table JPEG chuẩn (chất lượng trung bình)
Q = np.array([
    [16, 11, 10, 16, 24, 40, 51, 61],
    [12, 12, 14, 19, 26, 58, 60, 55],
    [14, 13, 16, 24, 40, 57, 69, 56],
    [14, 17, 22, 29, 51, 87, 80, 62],
    [18, 22, 37, 56, 68, 109, 103, 77],
    [24, 35, 55, 64, 81, 104, 113, 92],
    [49, 64, 78, 87, 103, 121, 120, 101],
    [72, 92, 95, 98, 112, 100, 103, 99]
], dtype=np.float32)

# 4. Lượng tử hóa
quantized = np.round(dct_block / Q)

# 5. Giải lượng tử + IDCT
dequantized   = quantized * Q
reconstructed = cv2.idct(dequantized).astype(np.float32)

# 6. Đo lường
rmse = np.sqrt(np.mean((block - reconstructed) ** 2))
print(f"RMSE khối gốc vs tái tạo: {rmse:.4f}")
print(f"Số hệ số khác 0 sau lượng tử hóa: {np.count_nonzero(quantized)}/64")

# 7. Hiển thị 5 panel
fig, axes = plt.subplots(1, 5, figsize=(20, 4))
axes[0].imshow(block, cmap='gray'); axes[0].set_title('Khối gốc 8×8'); axes[0].axis('off')

dct_vis = 20 * np.log(1 + np.abs(dct_block))
axes[1].imshow(dct_vis, cmap='gray'); axes[1].set_title('Hệ số DCT (log)'); axes[1].axis('off')

axes[2].imshow(Q, cmap='gray'); axes[2].set_title('Q-table JPEG'); axes[2].axis('off')
for i in range(8):
    for j in range(8):
        axes[2].text(j, i, int(Q[i,j]), ha='center', va='center', fontsize=6, color='red')

axes[3].imshow(quantized, cmap='gray'); axes[3].set_title('Sau lượng tử hóa'); axes[3].axis('off')
for i in range(8):
    for j in range(8):
        axes[3].text(j, i, int(quantized[i,j]), ha='center', va='center', fontsize=6, color='yellow')

axes[4].imshow(reconstructed, cmap='gray')
axes[4].set_title(f'Tái tạo\nRMSE={rmse:.2f}'); axes[4].axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- **Hệ số DC (góc trái trên):** rất lớn → mang thông tin nền (độ sáng trung bình).
- **Hệ số AC tần số cao:** về 0 sau lượng tử hóa → có thể bỏ.
- **Sau khi tái tạo:** khối giữ được cấu trúc chính.

---


### 3.2. Pipeline JPEG đơn giản
**📌 Bài tập 11:**
Xây dựng pipeline nén JPEG đơn giản cho ảnh `data.camera()`. Chia ảnh thành khối 8×8, áp dụng DCT + lượng tử hóa + Zigzag + RLE. Đo tỷ lệ nén, giải nén và so sánh RMSE/SNR.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Chuẩn bị ảnh
img = data.camera()
H, W = img.shape
H8, W8 = (H // 8) * 8, (W // 8) * 8
img = img[:H8, :W8]

# 2. Q-table JPEG
Q = np.array([
    [16, 11, 10, 16, 24, 40, 51, 61],
    [12, 12, 14, 19, 26, 58, 60, 55],
    [14, 13, 16, 24, 40, 57, 69, 56],
    [14, 17, 22, 29, 51, 87, 80, 62],
    [18, 22, 37, 56, 68, 109, 103, 77],
    [24, 35, 55, 64, 81, 104, 113, 92],
    [49, 64, 78, 87, 103, 121, 120, 101],
    [72, 92, 95, 98, 112, 100, 103, 99]
], dtype=np.float32)

# 3. Bảng chỉ số Zigzag
zigzag = np.array([
    [ 0,  1,  5,  6, 14, 15, 27, 28],
    [ 2,  4,  7, 13, 16, 26, 29, 42],
    [ 3,  8, 12, 17, 25, 30, 41, 43],
    [ 9, 11, 18, 24, 31, 40, 44, 53],
    [10, 19, 23, 32, 39, 45, 52, 54],
    [20, 22, 33, 38, 46, 51, 55, 60],
    [21, 34, 37, 47, 50, 56, 59, 61],
    [35, 36, 48, 49, 57, 58, 62, 63]
])
zigzag_order = np.argsort(zigzag.ravel())
zigzag_inv   = np.argsort(zigzag_order)

# 4. NÉN
encoded_stream = []
total_coeff    = 0
for i in range(0, H8, 8):
    for j in range(0, W8, 8):
        block = img[i:i+8, j:j+8].astype(np.float32)
        dct   = cv2.dct(block)
        q     = np.round(dct / Q)
        zz    = q.ravel()[zigzag_order]
        # Cắt bỏ các 0 cuối (EOB)
        nz = np.nonzero(zz)[0]
        if len(nz) == 0:
            encoded_stream.append((0, np.array([])))
        else:
            k = nz[-1] + 1
            encoded_stream.append((k, zz[:k]))
        total_coeff += 1

# 5. Đo tỷ lệ nén (theo số hệ số)
total_full    = total_coeff * 64
total_stored  = sum(k for k, _ in encoded_stream)
print(f"Số khối               : {total_coeff}")
print(f"Tổng hệ số ban đầu    : {total_full:,}")
print(f"Số hệ số thực sự lưu  : {total_stored:,}")
print(f"Tỷ lệ nén (hệ số)     : {total_full/total_stored:.2f}:1")

# 6. GIẢI NÉN
restored = np.zeros((H8, W8), dtype=np.float32)
idx = 0
for i in range(0, H8, 8):
    for j in range(0, W8, 8):
        k, zz_partial = encoded_stream[idx]
        zz_full = np.zeros(64)
        zz_full[:k] = zz_partial
        q   = zz_full[zigzag_inv].reshape(8, 8)
        deq = q * Q
        block = cv2.idct(deq)
        restored[i:i+8, j:j+8] = block
        idx += 1
restored = np.clip(restored, 0, 255).astype(np.uint8)

# 7. ĐÁNH GIÁ
def calculate_rmse(a, b):
    return np.sqrt(np.mean((a.astype(np.float32) - b.astype(np.float32)) ** 2))

def calculate_snr(orig, comp):
    sp = np.mean(orig.astype(np.float32) ** 2)
    np_ = np.mean((orig.astype(np.float32) - comp.astype(np.float32)) ** 2)
    return 10 * np.log10(sp / np_)

rmse = calculate_rmse(img, restored)
snr  = calculate_snr(img, restored)
print(f"\nRMSE (toàn ảnh): {rmse:.4f}")
print(f"SNR  (toàn ảnh): {snr:.2f} dB")

# 8. Hiển thị
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
axes[0].imshow(img, cmap='gray');      axes[0].set_title('Ảnh gốc'); axes[0].axis('off')
axes[1].imshow(restored, cmap='gray')
axes[1].set_title(f'Ảnh sau nén\nRMSE={rmse:.2f}, SNR={snr:.2f} dB'); axes[1].axis('off')
axes[2].imshow(np.abs(img.astype(int) - restored.astype(int)).astype(np.uint8), cmap='gray')
axes[2].set_title('|Sai số| ×3'); axes[2].axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- Ảnh sau nén **gần như không phân biệt bằng mắt**.
- Sai số tập trung ở **vùng chi tiết cao** (biên, texture).

---


### 3.3. Mã hóa dự đoán DPCM
**📌 Bài tập 12:**
Cho ảnh `data.camera()`. Cài đặt DPCM 1D trên **một hàng pixel**. Vẽ biểu đồ giá trị pixel gốc vs sai số DPCM. So sánh entropy của ảnh gốc và entropy của sai số.

```python
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Hàm mã hóa DPCM 1D (an toàn với NumPy 2.x)
def dpcm_encode_1d(signal):
    """signal: mảng 1D. Trả về list sai số e[i] = f[i] - f[i-1]."""
    signal = signal.astype(int)
    encoded = [int(signal[0])]
    for i in range(1, len(signal)):
        encoded.append(int(signal[i]) - int(signal[i-1]))
    return encoded

# 2. Hàm giải mã DPCM
def dpcm_decode_1d(encoded):
    decoded = [int(encoded[0])]
    for i in range(1, len(encoded)):
        decoded.append(int(decoded[i-1]) + int(encoded[i]))
    return np.array(decoded, dtype=np.uint8)

# 3. Áp dụng cho 1 hàng
img = data.camera()
row = img[256, :]
enc_row = dpcm_encode_1d(row)
dec_row = dpcm_decode_1d(enc_row)

print(f"Round-trip hàng y=256 OK: {np.array_equal(row, dec_row)}")
print(f"Giá trị sai số min/max  : {min(enc_row)} / {max(enc_row)}")

# 4. So sánh
fig, axes = plt.subplots(3, 1, figsize=(13, 9))
axes[0].plot(row, color='steelblue')
axes[0].set_title('Hàng pixel gốc (y=256)')
axes[0].set_ylabel('Mức xám')

axes[1].plot(enc_row, color='crimson')
axes[1].set_title('Sai số DPCM (e[i] = f[i] - f[i-1])')
axes[1].set_ylabel('Sai số')

axes[2].hist(row, 256, [0, 256], alpha=0.5, label='Pixel gốc', color='steelblue')
axes[2].hist(np.array(enc_row) + 128, 256, [0, 256],
             alpha=0.5, label='Sai số (+128)', color='crimson')
axes[2].set_title('Histogram so sánh')
axes[2].legend()
plt.tight_layout(); plt.show()

# 5. Entropy
def calculate_entropy(img):
    hist, _ = np.histogram(img.flatten(), 256, [0, 256])
    p = hist / img.size
    p = p[p > 0]
    return -np.sum(p * np.log2(p))

def entropy_of_errors(errors):
    """Entropy của mảng sai số (giá trị từ -255 đến 255)."""
    hist, _ = np.histogram(errors, 512, [-256, 256])
    p = hist / len(errors)
    p = p[p > 0]
    return -np.sum(p * np.log2(p))

H_orig = calculate_entropy(img)
H_err  = entropy_of_errors(np.array(enc_row))

print(f"\nEntropy ảnh gốc      : {H_orig:.4f} bit/pixel")
print(f"Entropy sai số DPCM  : {H_err:.4f} bit/pixel (hàng y=256)")
print(f"→ DPCM giảm entropy {H_orig - H_err:.4f} bit/pixel → nén hiệu quả hơn")
```

**Kết quả mong đợi:**
- Sai số DPCM **rất nhỏ** (đa số gần 0).
- Histogram của sai số **tập trung quanh 0** → entropy thấp.
- Đây là cơ sở của nén lossless (dự đoán + Huffman) và lossy (dự đoán + lượng tử hóa).

---


### 3.4. Biến đổi Wavelet rời rạc (DWT Haar)
**📌 Bài tập 13:**
Cài đặt DWT Haar 1 mức (không cần thư viện ngoài). Phân tích ảnh `data.camera()` thành 4 băng con LL, LH, HL, HH. So sánh năng lượng các băng, nén lossy đơn giản bằng ngưỡng hóa.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt
from skimage import data

# 1. Hàm DWT Haar 1 mức
def dwt_haar_2d(img):
    """DWT Haar 1 mức. Trả về LL, LH, HL, HH."""
    img = img.astype(np.float32)
    # Lọc hàng
    L = (img[:, 0::2] + img[:, 1::2]) / np.sqrt(2)
    H = (img[:, 0::2] - img[:, 1::2]) / np.sqrt(2)
    # Lọc cột
    LL = (L[0::2, :] + L[1::2, :]) / np.sqrt(2)
    LH = (L[0::2, :] - L[1::2, :]) / np.sqrt(2)
    HL = (H[0::2, :] + H[1::2, :]) / np.sqrt(2)
    HH = (H[0::2, :] - H[1::2, :]) / np.sqrt(2)
    return LL, LH, HL, HH

# 2. Hàm IDWT Haar
def idwt_haar_2d(LL, LH, HL, HH):
    """IDWT Haar 1 mức."""
    L = np.zeros((2 * LL.shape[0], LL.shape[1]), dtype=np.float32)
    H = np.zeros_like(L)
    L[0::2, :] = (LL + LH) / np.sqrt(2)
    L[1::2, :] = (LL - LH) / np.sqrt(2)
    H[0::2, :] = (HL + HH) / np.sqrt(2)
    H[1::2, :] = (HL - HH) / np.sqrt(2)
    img = np.zeros((L.shape[0], 2 * L.shape[1]), dtype=np.float32)
    img[:, 0::2] = (L + H) / np.sqrt(2)
    img[:, 1::2] = (L - H) / np.sqrt(2)
    return img

# 3. Chuẩn bị ảnh (cắt cho chẵn)
img = data.camera()
H8, W8 = (img.shape[0] // 2) * 2, (img.shape[1] // 2) * 2
img = img[:H8, :W8]

# 4. DWT
LL, LH, HL, HH = dwt_haar_2d(img)

def norm_vis(x):
    return cv2.normalize(np.abs(x), None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)

# 5. Hiển thị 4 băng con
fig, axes = plt.subplots(1, 5, figsize=(20, 4))
axes[0].imshow(img, cmap='gray'); axes[0].set_title('Ảnh gốc'); axes[0].axis('off')
axes[1].imshow(norm_vis(LL), cmap='gray'); axes[1].set_title(f'LL\nE={np.sum(LL**2):.2e}'); axes[1].axis('off')
axes[2].imshow(norm_vis(LH), cmap='gray'); axes[2].set_title(f'LH (ngang)\nE={np.sum(LH**2):.2e}'); axes[2].axis('off')
axes[3].imshow(norm_vis(HL), cmap='gray'); axes[3].set_title(f'HL (dọc)\nE={np.sum(HL**2):.2e}'); axes[3].axis('off')
axes[4].imshow(norm_vis(HH), cmap='gray'); axes[4].set_title(f'HH (chéo)\nE={np.sum(HH**2):.2e}'); axes[4].axis('off')
plt.tight_layout(); plt.show()

# 6. So sánh năng lượng
E_LL = np.sum(LL**2)
E_total = E_LL + np.sum(LH**2) + np.sum(HL**2) + np.sum(HH**2)
print(f"Năng lượng băng LL       : {E_LL:.4e} ({E_LL/E_total*100:.2f}% tổng)")
print(f"Năng lượng 3 băng còn lại: {(E_total - E_LL)/E_total*100:.2f}%")
print("→ LL tập trung phần lớn năng lượng → chỉ cần giữ LL là đã có ảnh gần đúng")

# 7. Nén lossy: ngưỡng hóa 3 băng chi tiết
threshold = 30
LH_t = np.where(np.abs(LH) > threshold, LH, 0)
HL_t = np.where(np.abs(HL) > threshold, HL, 0)
HH_t = np.where(np.abs(HH) > threshold, HH, 0)

restored = idwt_haar_2d(LL, LH_t, HL_t, HH_t)
restored = np.clip(restored, 0, 255).astype(np.uint8)

rmse = np.sqrt(np.mean((img.astype(np.float32) - restored.astype(np.float32)) ** 2))
print(f"\nRMSE sau khi ngưỡng hóa 3 băng chi tiết: {rmse:.4f}")

# 8. Hiển thị
fig, axes = plt.subplots(1, 2, figsize=(11, 5))
axes[0].imshow(img, cmap='gray'); axes[0].set_title('Ảnh gốc'); axes[0].axis('off')
axes[1].imshow(restored, cmap='gray')
axes[1].set_title(f'Tái tạo (ngưỡng={threshold})\nRMSE={rmse:.2f}'); axes[1].axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**
- **LL:** chứa phần lớn năng lượng → ảnh xấp xỉ.
- **LH/HL/HH:** chứa chi tiết theo hướng ngang/dọc/chéo.
- Ngưỡng hóa làm mất chi tiết nhỏ nhưng **không có blocking artifact** như DCT.

---


### 3.5. So sánh các phương pháp nén
**📌 Bài tập 14:**
Cho ảnh `data.camera()`. Áp dụng 4 phương pháp:
1. **Lossless:** RLE trên ảnh nhị phân (ngưỡng 128).
2. **Lossy 1:** Lượng tử hóa 4-bit.
3. **Lossy 2:** DCT + lượng tử hóa (Q-table × 4).
4. **Lossy 3:** Wavelet + ngưỡng hóa.

Đo kích thước sau nén, RMSE, SNR cho mỗi phương pháp. Vẽ bảng tổng hợp.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from skimage import data

# 1. Chuẩn bị ảnh
img_full = data.camera()
H8 = (img_full.shape[0] // 8) * 8
W8 = (img_full.shape[1] // 8) * 8
img = img_full[:H8, :W8]

# 2. Hàm phụ trợ
def rle_encode(arr):
    if len(arr) == 0: return []
    pairs = []
    cur_val, count = arr[0], 1
    for v in arr[1:]:
        if v == cur_val: count += 1
        else:
            pairs.append((cur_val, count))
            cur_val, count = v, 1
    pairs.append((cur_val, count))
    return pairs

def rle_decode(pairs, shape):
    flat = []
    for val, cnt in pairs:
        flat.extend([val] * cnt)
    return np.array(flat, dtype=np.uint8).reshape(shape)

def quantize_bits(img, bits):
    step = 256 // (2 ** bits)
    return ((img // step) * step).astype(np.uint8)

def calculate_rmse(a, b):
    return np.sqrt(np.mean((a.astype(np.float32) - b.astype(np.float32)) ** 2))

def calculate_snr(orig, comp):
    sp = np.mean(orig.astype(np.float32) ** 2)
    npo = np.mean((orig.astype(np.float32) - comp.astype(np.float32)) ** 2)
    return 10 * np.log10(sp / npo) if npo > 0 else float('inf')

# 3. RLE trên ảnh nhị phân
binary = (img > 128).astype(np.uint8)
pairs = rle_encode(binary.flatten())
size_rle = len(pairs) * 9
img_rle  = rle_decode(pairs, binary.shape) * 255

# 4. Lượng tử hóa 4-bit
q4 = quantize_bits(img, 4)
size_q4 = img.size * 4

# 5. DCT + Q-table × 4
Q_base = np.array([
    [16, 11, 10, 16, 24, 40, 51, 61],
    [12, 12, 14, 19, 26, 58, 60, 55],
    [14, 13, 16, 24, 40, 57, 69, 56],
    [14, 17, 22, 29, 51, 87, 80, 62],
    [18, 22, 37, 56, 68, 109, 103, 77],
    [24, 35, 55, 64, 81, 104, 113, 92],
    [49, 64, 78, 87, 103, 121, 120, 101],
    [72, 92, 95, 98, 112, 100, 103, 99]
], dtype=np.float32)
Q = Q_base * 4

coeff_count = 0
img_dct = np.zeros((H8, W8), dtype=np.float32)
for i in range(0, H8, 8):
    for j in range(0, W8, 8):
        block = img[i:i+8, j:j+8].astype(np.float32)
        dct = cv2.dct(block)
        q   = np.round(dct / Q)
        # Đếm hệ số (giả lập nén)
        zz = q.ravel()
        nz = np.nonzero(zz)[0]
        coeff_count += (nz[-1] + 1) if len(nz) > 0 else 0
        # Tái tạo
        img_dct[i:i+8, j:j+8] = cv2.idct(q * Q)
img_dct = np.clip(img_dct, 0, 255).astype(np.uint8)
size_dct = coeff_count * 8

# 6. Wavelet + ngưỡng
def dwt_haar_2d(image):
    image = image.astype(np.float32)
    L = (image[:, 0::2] + image[:, 1::2]) / np.sqrt(2)
    H = (image[:, 0::2] - image[:, 1::2]) / np.sqrt(2)
    LL = (L[0::2, :] + L[1::2, :]) / np.sqrt(2)
    LH = (L[0::2, :] - L[1::2, :]) / np.sqrt(2)
    HL = (H[0::2, :] + H[1::2, :]) / np.sqrt(2)
    HH = (H[0::2, :] - H[1::2, :]) / np.sqrt(2)
    return LL, LH, HL, HH

def idwt_haar_2d(LL, LH, HL, HH):
    L = np.zeros((2*LL.shape[0], LL.shape[1]), dtype=np.float32)
    H = np.zeros_like(L)
    L[0::2, :] = (LL + LH) / np.sqrt(2)
    L[1::2, :] = (LL - LH) / np.sqrt(2)
    H[0::2, :] = (HL + HH) / np.sqrt(2)
    H[1::2, :] = (HL - HH) / np.sqrt(2)
    image = np.zeros((L.shape[0], 2*L.shape[1]), dtype=np.float32)
    image[:, 0::2] = (L + H) / np.sqrt(2)
    image[:, 1::2] = (L - H) / np.sqrt(2)
    return image

LL, LH, HL, HH = dwt_haar_2d(img)
threshold = 40
LH_t = np.where(np.abs(LH) > threshold, LH, 0)
HL_t = np.where(np.abs(HL) > threshold, HL, 0)
HH_t = np.where(np.abs(HH) > threshold, HH, 0)
img_wav = np.clip(idwt_haar_2d(LL, LH_t, HL_t, HH_t), 0, 255).astype(np.uint8)

nonzero_wav = (np.count_nonzero(LL) + np.count_nonzero(LH_t) +
               np.count_nonzero(HL_t) + np.count_nonzero(HH_t))
size_wav = nonzero_wav * 8

# 7. Bảng tổng hợp
def stats(name, comp_img, size_bits, orig):
    rmse = calculate_rmse(orig, comp_img)
    snr  = calculate_snr(orig, comp_img)
    C    = (orig.size * 8) / size_bits if size_bits > 0 else float('inf')
    return f"{name:<25}{size_bits:>15,}{C:>12.2f}{rmse:>10.2f}{snr:>12.2f}"

print(f"{'Phương pháp':<25}{'Kích thước (bit)':>15}{'Tỷ lệ C':>12}{'RMSE':>10}{'SNR (dB)':>12}")
print("-" * 76)
print(stats('Ảnh gốc (8-bit)', img, img.size * 8, img))
print(stats('RLE (nhị phân)', img_rle, size_rle, img))
print(stats('Quantize 4-bit', q4, size_q4, img))
print(stats('DCT + Q×4', img_dct, size_dct, img))
print(stats(f'Wavelet + ngưỡng {threshold}', img_wav, size_wav, img))

# 8. Hiển thị
fig, axes = plt.subplots(1, 5, figsize=(20, 5))
for ax, (im, t) in zip(axes, [
    (img, 'Ảnh gốc'),
    (img_rle, 'RLE (lossless)'),
    (q4, 'Quantize 4-bit'),
    (img_dct, 'DCT + Q×4'),
    (img_wav, 'Wavelet + ngưỡng')
]):
    ax.imshow(im, cmap='gray'); ax.set_title(t); ax.axis('off')
plt.tight_layout(); plt.show()
```

**Kết quả mong đợi:**

| Phương pháp | Đặc điểm |
|-------------|----------|
| **RLE** | Lossless, tỷ lệ nén thấp |
| **Quantize 4-bit** | Lossy đơn giản, giảm 50% dung lượng |
| **DCT + Q×4** | Nén mạnh, giữ cấu trúc tốt |
| **Wavelet + ngưỡng** | Nén mạnh, không blocking artifact |

**Trade-off:** Tỷ lệ nén càng cao → RMSE tăng, SNR giảm.

---


## 4. Tổng kết

---


### 4.1. Bảng tổng hợp — Ví dụ theo slide lý thuyết

| Slide lý thuyết | Bài tập | Chủ đề |
|-----------------|:-------:|--------|
| Entropy | 1 | Đo lượng tin trung bình |
| Tỷ lệ nén & dư thừa | 2 | Công thức C, R |
| RMSE & SNR | 3 | Đánh giá chất lượng |
| Mã Huffman | 4 | Xây dựng cây + mã hóa |
| Golomb-Rice | 5 | Mã hóa số nguyên |
| Mã số học | 6 | Arithmetic Coding |
| Mã LZW | 7 | Từ điển động |
| Mã RLE | 8 | Chuỗi lặp |
| Bit-Plane | 9 | Mã hóa bit-plane |
| Block Transform Coding | 10 | DCT 8×8 |
| Pipeline JPEG | 11 | DCT + Zigzag + RLE |
| DPCM | 12 | Mã hóa dự đoán |
| Wavelet | 13 | DWT Haar |
| So sánh nén | 14 | Lossless vs Lossy |

---


### 4.2. Lưu ý quan trọng khi chạy code

| Vấn đề | Cách xử lý |
|--------|-----------|
| **OverflowError** khi cộng/trừ `uint8` | Ép về `int`/`float` trước, `clip` sau |
| **Entropy sai số** có giá trị âm | Histogram bin `[-256, 256]` với 512 bin |
| **DCT** yêu cầu `float32` | `.astype(np.float32)` trước `cv2.dct` |
| **RLE round-trip** | Lưu cả `shape` để reshape khi giải nén |
| **Notch filter** (nếu tái sử dụng) | Khai báo `u0`, `v0`, `A` ở phạm vi toàn cục |

---


### 4.3. Tổng kết

**Ba nhóm nội dung chính Chương 3:**

| Nhóm | Số bài tập | Kỹ thuật chủ đạo |
|------|:----------:|------------------|
| **1. Đo lường & đánh giá** | 1 → 3 | Entropy, C, R, RMSE, SNR |
| **2. Nén Lossless** | 4 → 9 | Huffman, Golomb-Rice, Arithmetic, LZW, RLE, Bit-Plane |
| **3. Nén Lossy** | 10 → 14 | DCT, JPEG pipeline, DPCM, Wavelet |

**📌 Nhớ 3 điều:**
1. **Entropy** là giới hạn dưới lý thuyết của nén lossless (định lý Shannon).
2. **Nén Lossless:** giữ nguyên dữ liệu, tỷ lệ nén thấp (2:1 → 4:1).
3. **Nén Lossy:** loại bỏ thông tin không quan trọng, tỷ lệ nén cao (10:1 → 20:1+).