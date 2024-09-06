# Hotel Booking System

## Mô tả

Hotel Booking là một ứng dụng web cho phép người dùng tìm kiếm và đặt phòng khách sạn. Ứng dụng cung cấp các tính năng như tìm kiếm phòng, xem chi tiết phòng, và thực hiện đặt phòng. Hệ thống cũng bao gồm giao diện quản trị cho quản lý danh sách đặt phòng (bookings).

## Hướng dẫn cài đặt và chạy locally

### Yêu cầu

-   NextJs
-   Node.js (Lưu ý: Sử dụng phiên bản LTS)
-   PostgreSQL (hoặc cơ sở dữ liệu tương thích qua Supabase)

### Cài đặt

1. **Clone repository**

    ```bash
    git clone https://github.com/minhhoanq/hotel-booking.git
    cd hotel-booking
    cd client
    ```

2. **Cài đặt các dependencies**

    ```bash
    npm install
    ```

3. **Cấu hình biến môi trường**

    Tạo file `.env` trong thư mục gốc và thêm các biến môi trường cần thiết:

    ```dotenv
    NEXT_PUBLIC_CLIENT_URL=http://localhost:3000

    KINDE_CLIENT_ID=your_kinde_client_id
    KINDE_CLIENT_SECRET=your_kinde_client_secret
    KINDE_ISSUER_URL=https://your_kinde_issuer_url

    KINDE_SITE_URL=http://localhost:3000
    KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
    KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/api/auth/creation

    LOGIN_URL=https://your_kinde_login_url

    DATABASE_URL="postgresql://user:password@host:port/database"
    DIRECT_URL="postgresql://user:password@host:port/database"
    ```

4. **Chạy migration (nếu sử dụng Prisma)**

    ```bash
    npx prisma migrate dev
    ```

5. **Chạy ứng dụng**

    ```bash
    npm run dev
    ```

    Ứng dụng sẽ chạy tại `http://localhost:3000`.

## Cấu trúc dự án

-   `/app` - Thư mục chứa các trang và routing cho ứng dụng.
-   `/app/api` - Thư mục chứa các endpoint API.
-   `/app/components` - Thư mục chứa các component React tái sử dụng.
-   `/lib` - Thư mục chứa các hàm tiện ích.
-   `/types` - Thư mục chứa interfaces.
-   `/public` - Thư mục chứa các tài nguyên tĩnh như hình ảnh.
-   `/prisma` - Thư mục chứa các file cấu hình Prisma và migration.
-   `/components/ui` - Thư mục chứa các file UI mẫu từ Shadcn.

## API endpoints

-   **GET /api/rooms**: Lấy danh sách phòng.
-   **GET /api/rooms/:id**: Lấy thông tin chi tiết phòng theo `id`.
-   **POST /api/bookings**: Tạo một đặt phòng mới.
-   **GET /api/bookings**: Lấy danh sách đặt phòng của người dùng.
-   **DELETE /api/bookings/:id**: Hủy đặt phòng theo `id`.

### Sơ đồ kiến trúc hệ thống

![](./client//public//booking.drawio.png)

## Link đến phiên bản triển khai

[Hotel Booking trên Vercel](https://hotel-booking-blue-ten.vercel.app/)

---

Cảm ơn bạn đã quan tâm đến dự án của chúng tôi!
