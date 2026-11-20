# Đất Lành

Trình diễn gameplay tự chạy cho dự án trò chơi giáo dục về ô nhiễm cadmium trong đất lúa.

## Xem demo trực tiếp trên GitHub Pages

Tệp `index.html` chạy độc lập, đã nhúng hình ảnh và không cần cài thư viện.

1. Tạo repository GitHub và push nhánh `main`.
2. Mở **Settings → Pages**.
3. Chọn **Deploy from a branch**, nhánh `main`, thư mục `/(root)`, rồi chọn **Save**.
4. Mở `https://<username>.github.io/<repository>/`.

GitHub Pages công bố trang lên Internet. Dùng repository public nếu tài khoản không bật Pages cho repository private.

## Chỉnh sửa demo

- Sửa `demo/demo.js`, `demo/demo.css` hoặc `demo/index.template.html`.
- Các cảnh nền nằm ở `demo/assets/`.
- Bản đồ khảo sát nền nằm ở `demo/field.webp`.
- Tạo lại trang độc lập bằng Python:

  ```powershell
  python demo/build.py
  ```

Lệnh cập nhật `index.html` và `Dat-Lanh-Demo.html`. Commit và push cả hai tệp để cập nhật GitHub Pages.

Bối cảnh và số liệu gameplay là dữ liệu mô phỏng.
