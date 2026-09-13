# Bài tập thực hành chương 3

## Bài 1: Tính Entropy của ảnh

**Mục tiêu:** Áp dụng công thức `H = -Σ p(r_k) log₂ p(r_k)` để đo lượng tin trung bình của ảnh.

**Yêu cầu:**
1. Viết hàm `calculate_entropy(img)` tính entropy của một ảnh xám.
2. So sánh entropy của 3 ảnh khác nhau về mức độ phức tạp: `data.camera()`, `data.coins()`, ảnh hằng số `np.ones((256,256))*128`.
3. Hiển thị 3 ảnh + histogram của chúng.
4. In bảng entropy và nhận xét ảnh nào có entropy cao nhất/thấp nhất.
5. Lưu kết quả vào `output/bai1_entropy.png`.

---

## Bài 2: Tỷ lệ nén (Compression Ratio) và Dư thừa (Redundancy)

**Mục tiêu:** Áp dụng công thức `C = b / b'` và `R = 1 - 1/C`.

**Yêu cầu:**
1. Cho ảnh xám 8-bit kích thước `M×N` (ví dụ 512×512), tính số bit gốc `b = M·N·8`.
2. Giả sử dùng một số phương pháp nén cho ra tỷ lệ nén `C ∈ {2, 5, 10, 20}`.
3. Tính và in bảng: `b'`, `C`, `R` cho từng phương pháp.
4. Vẽ biểu đồ cột so sánh `R` giữa các phương pháp; lưu vào `output/bai2_ratio.png`.

---

## Bài 3: Đo lường chất lượng — RMSE & SNR

**Mục tiêu:** Cài đặt RMSE và SNR để đánh giá khách quan chất lượng ảnh sau nén.

**Yêu cầu:**
1. Cài đặt `calculate_rmse(orig, comp)` và `calculate_snr(orig, comp)`.
2. Tải ảnh `data.camera()`. Tạo 3 phiên bản "nén giả" bằng cách lượng tử hóa mức xám xuống 7-bit, 5-bit, 3-bit.
3. Tính RMSE và SNR của mỗi phiên bản so với ảnh gốc → in bảng.
4. Hiển thị 4 ảnh (gốc + 3 phiên bản) kèm RMSE/SNR tương ứng.
5. Lưu kết quả vào `output/bai3_quality.png`.

---

## Bài 4: Mã Huffman — Xây dựng cây và mã hóa

**Mục tiêu:** Cài đặt thuật toán Huffman từ đầu và minh họa trên chuỗi.

**Yêu cầu:**
1. Cài đặt class `Node` và các hàm `build_huffman_tree`, `generate_codes`.
2. Áp dụng cho chuỗi `"aabbc"` và chuỗi `"Cộng hoà xã hội chủ nghĩa"`.
3. In bảng mã Huffman cho từng ký tự.
4. Tính số bit trung bình/ký tự và entropy của nguồn → so sánh.
5. Trực quan hóa tần suất ký tự bằng biểu đồ cột; lưu vào `output/bai4_huffman.png`.

---

## Bài 5: Mã hóa và giải mã Golomb-Rice

**Mục tiêu:** Cài đặt Golomb-Rice code với tham số `k`.

**Yêu cầu:**
1. Cài đặt `golomb_rice_encode(n, k)` và `golomb_rice_decode(bits, k)`.
2. Mã hóa và giải mã các số nguyên: `n ∈ {0, 1, 2, 3, 5, 13, 27, 100}` với `k=2`.
3. In bảng: `n | q | r | mã | giải mã`.
4. In bảng so sánh số bit với mã nhị phân cố định 8-bit.
5. Lưu kết quả bảng vào file `output/bai5_golomb.txt`.

---

## Bài 6: Mã hóa số học (Arithmetic Coding)

**Mục tiêu:** Cài đặt thuật toán mã hóa số học cho chuỗi ký tự.

**Yêu cầu:**
1. Cài đặt `arithmetic_encode(message, probs)` và `arithmetic_decode(value, probs, n_chars)`.
2. Áp dụng với bảng xác suất `{A:0.5, B:0.3, C:0.2}` cho các chuỗi: `"A"`, `"AB"`, `"BAC"`, `"ABC"`.
3. In bảng: chuỗi | giá trị mã hóa | chuỗi giải mã.
4. Kiểm tra round-trip: mã hóa → giải mã → so sánh với chuỗi gốc.
5. Lưu kết quả vào `output/bai6_arithmetic.txt`.

---

## Bài 7: Nén và giải nén LZW

**Mục tiêu:** Cài đặt LZW cho chuỗi, đảm bảo round-trip.

**Yêu cầu:**
1. Cài đặt `lzw_compress(text)` và `lzw_decompress(codes)`.
2. Áp dụng cho chuỗi `"ABAAABABA"` và một chuỗi dài hơn `"TOBEORNOTTOBEORTOBEORNOT"`.
3. In bảng quá trình mã hóa cho chuỗi `"ABAAABABA"` (từng bước).
4. Kiểm tra round-trip: giải nén → so sánh với chuỗi gốc.
5. Lưu kết quả vào `output/bai7_lzw.txt`.

---

## Bài 8: Mã hóa Run-Length (RLE) cho ảnh nhị phân

**Mục tiêu:** Cài đặt RLE và áp dụng cho ảnh nhị phân.

**Yêu cầu:**
1. Cài đặt `rle_encode(arr)` và `rle_decode(pairs, shape)` cho mảng 1D.
2. Tạo ảnh nhị phân từ `data.camera()` (ngưỡng > 128) rồi "flatten".
3. Áp dụng RLE và tính tỷ lệ nén (so với mảng gốc 0/1).
4. Giải nén và kiểm tra round-trip.
5. Hiển thị ảnh gốc và ảnh sau khi giải nén; lưu vào `output/bai8_rle.png`.

---

## Bài 9: Mã hóa Bit-Plane và nén

**Mục tiêu:** Phân tích mức độ đóng góp của từng bit-plane và thử nén bằng RLE.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Tách 8 bit-plane.
3. Áp dụng RLE cho từng bit-plane và tính tỷ lệ nén tương ứng.
4. In bảng tỷ lệ nén 8 bit-plane.
5. Hiển thị 8 bit-plane (bit 7 → bit 0); lưu vào `output/bai9_bitplane.png`.

---

## Bài 10: Block Transform Coding — DCT cho khối 8×8

**Mục tiêu:** Áp dụng DCT, quantization và IDCT cho một khối 8×8.

**Yêu cầu:**
1. Tải ảnh `data.camera()`, cắt một khối 8×8 từ vùng giữa.
2. Áp dụng DCT bằng `cv2.dct` (cần mở rộng ảnh lên `float32`).
3. Lượng tử hóa với Q-table mẫu (JPEG-like).
4. Giải lượng tử hóa và IDCT để tái tạo khối.
5. Hiển thị: khối gốc, hệ số DCT (log-scale), Q-table, khối sau lượng tử hóa, khối tái tạo.
6. Lưu kết quả vào `output/bai10_dct_block.png`.

---

## Bài 11: Nén ảnh hoàn chỉnh với DCT + Zigzag + RLE

**Mục tiêu:** Xây dựng pipeline nén ảnh JPEG đơn giản.

**Yêu cầu:**
1. Chia ảnh `data.camera()` (kích thước bội số của 8) thành các khối 8×8.
2. Áp dụng DCT + lượng tử hóa với Q-table.
3. Quét Zigzag và áp dụng RLE (chỉ mã hóa hệ số cuối cùng khác 0).
4. Đo tỷ lệ nén thực tế (theo số hệ số).
5. Giải nén ngược: RLE-decode → Zigzag-inverse → Dequantize → IDCT → ghép khối.
6. Hiển thị ảnh gốc + ảnh sau nén + so sánh RMSE/SNR.
7. Lưu kết quả vào `output/bai11_jpeg_pipeline.png`.

---

## Bài 12: Mã hóa dự đoán DPCM cho ảnh

**Mục tiêu:** Áp dụng DPCM để nén ảnh dựa trên sai số dự đoán.

**Yêu cầu:**
1. Cài đặt `dpcm_encode_1d(signal)` và `dpcm_decode_1d(encoded)`.
2. Áp dụng cho **một hàng pixel** của ảnh `data.camera()`.
3. Vẽ biểu đồ: giá trị pixel gốc vs sai số DPCM.
4. Tính entropy của ảnh gốc và entropy của sai số DPCM → so sánh.
5. Hiển thị ảnh gốc và ảnh sau khi round-trip; lưu vào `output/bai12_dpcm.png`.

---

## Bài 13: Biến đổi Wavelet rời rạc (DWT)

**Mục tiêu:** Hiểu biến đổi wavelet và ứng dụng trong nén ảnh.

**Yêu cầu:**
1. Cài đặt DWT 1 mức bằng bộ lọc Haar (thủ công) — hoặc dùng `pywt` nếu có.
2. Phân tích ảnh `data.camera()` thành 4 băng con: LL, LH, HL, HH.
3. Hiển thị 4 băng con; so sánh năng lượng của từng băng.
4. Thử nén lossy đơn giản: giữ lại LL + một phần các băng chi tiết, sau đó IDWT.
5. So sánh ảnh gốc với ảnh tái tạo (RMSE); lưu vào `output/bai13_wavelet.png`.

---

## Bài 14: So sánh các phương pháp nén

**Mục tiêu:** Tổng hợp, so sánh lossless vs lossy trên cùng một ảnh.

**Yêu cầu:**
1. Tải ảnh `data.camera()`.
2. Thực hiện 4 phương pháp:
   - **Lossless:** RLE trên ảnh nhị phân (ngưỡng 128).
   - **Lossy 1:** Lượng tử hóa 4-bit.
   - **Lossy 2:** DCT + lượng tử hóa (Q-table × 4).
   - **Lossy 3:** Wavelet + ngưỡng hóa.
3. Đo kích thước sau nén (xấp xỉ) và RMSE/SNR cho mỗi phương pháp.
4. Hiển thị 4 ảnh kết quả + bảng tổng hợp; lưu vào `output/bai14_compare.png`.
