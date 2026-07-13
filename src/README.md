# Hệ quản trị CSDL với Oracle

---

## 📚 Tổng quan khóa học

Khóa học bao gồm 4 chương, bao gồm các nội dung sau đây:

- [Chương 1. Giới thiệu tổng quan, cài đặt môi trường](slides/chapter_1_intro.html)
- [Chương 2. Ngôn ngữ SQL trong Oracle](slides/chapter_2_sql.html)
- [Chương 3. Lập trình PL/SQL](slides/chapter_3_plsql.html)
- [Chương 4. Kiến trúc và Quản trị hệ thống](slides/chapter_4_admin.html)

---

## 📖 Nội dung các chương

### Chương 1: Giới thiệu tổng quan

- Giới thiệu về cơ sở dữ liệu và các mô hình CSDL
- Hệ quản trị CSDL (DBMS) và so sánh các hệ quản trị phổ biến
- Giới thiệu Oracle Database và các phiên bản (XE, SE, EE)
- Kiến trúc Multitenant (`CDB`/`PDB`) trong Oracle 19c
- **Thực hành:** Cài đặt Oracle 19c, thiết lập môi trường, tạo cơ sở dữ liệu mẫu `EMP/DEPT`

---

### Chương 2: SQL trong Oracle

- Tổng quan về `SQL` và các nhóm lệnh (`DDL`, `DML`, `DCL`, `TCL`)
- **DDL:** `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME`
- **DML:** `INSERT`, `UPDATE`, `DELETE`, `SELECT`
- **DCL:** `GRANT`, `REVOKE` - Quản lý quyền truy cập
- **TCL:** `COMMIT`, `ROLLBACK`, `SAVEPOINT` - Quản lý giao dịch
- **Thực hành:** Xây dựng và thao tác với bảng `PROJECT`, `ASSIGNMENT`; quản lý user và role

---

### Chương 3: Ngôn ngữ `PL/SQL`

- Tổng quan về `PL/SQL` và cấu trúc khối lệnh
- Các thành phần `PL/SQL`: Biến, Hằng, Kiểu dữ liệu (Scalar, Reference, Record, Collection)
- Cấu trúc điều khiển: `IF`, `CASE`, `LOOP`, `WHILE`, `FOR`
- **Cursor:** Explicit, Implicit, Parameterized, `FOR UPDATE`
- Xử lý ngoại lệ (Exception Handling): Predefined, User-defined, `RAISE_APPLICATION_ERROR`
- **Stored Procedure & Function:** Tạo, tham số, overloading
- **Package:** Specification, Body, Ứng dụng
- **Trigger:** `BEFORE`/`AFTER`, Row/Statement, `INSTEAD OF`
- **Thực hành:** Viết các thủ tục, hàm, trigger phục vụ quản lý nhân sự và dự án

---

### Chương 4: Kiến trúc và Quản trị Oracle

- **Kiến trúc Oracle:** Instance (SGA, Background Processes) và Database (Data files, Control files, Redo log files)
- Multitenant Architecture: `CDB`, `PDB`, Common/Local User
- **Quản trị Tablespace và lưu trữ:** Permanent, Temporary, Undo, Bigfile, OMF
- **Schema Objects:** Table, Index, View, Materialized View, Sequence, Synonym
- **Data Dictionary:** `DBA*`, `ALL*`, `USER_`, `V$` views
- **Quản trị người dùng và bảo mật:** User, Privilege, Role, Profile, Quota
- **Sao lưu và phục hồi:** `RMAN`, Backup Strategies (Full, Incremental, Cold/Hot), Restore & Recovery
- **Thực hành:** Quản trị tablespace, tạo user/role, backup với `RMAN`

---

## 🛠️ Công nghệ sử dụng

- **Oracle Database 19c** - Phiên bản Long Term Release
- **Oracle SQL Developer** - Công cụ GUI chính
- **SQL\*Plus** - Công cụ dòng lệnh
- **Visual Studio Code** - Với Oracle Developer Tools Extension

---

## 📝 Ghi chú

- Các ví dụ trong tài liệu sử dụng cơ sở dữ liệu mẫu **EMP/DEPT** và **PROJECT/ASSIGNMENT**.
- Để thực hành tốt, nên tạo user riêng (`thuchanh`) và tablespace độc lập (`ts_thuchanh`).
- Các câu lệnh SQL và `PL/SQL` có thể được thực thi trực tiếp trong SQL Developer hoặc VS Code.
