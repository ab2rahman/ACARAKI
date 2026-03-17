# Storage Setup Guide for Production

This issue is likely related to file permissions or missing storage links on the production server. Please follow these steps:

## 1. Create Storage Symbolic Link

Run this command on your production server:

```bash
php artisan storage:link
```

This creates a symbolic link from `public/storage` to `storage/app/public`.

## 2. Check Directory Permissions

Ensure your storage directories have proper permissions:

```bash
# Set proper permissions on storage directory
chmod -R 775 storage
chown -R www-data:www-data storage  # Use the appropriate web server user (www-data or nginx)
```

## 3. Check PHP Configuration

Make sure your PHP settings allow file uploads:

```
upload_max_filesize = 10M
post_max_size = 10M
```

## 4. Verify Form Encoding

Ensure your frontend form has the correct encoding:

```html
<form method="POST" enctype="multipart/form-data" ...>
```

## 5. Testing

Use the test endpoint to verify uploads are working:

```
POST /api/test-upload
```

With a form field named `test_file`.

## 6. Check Laravel Logs

Review the Laravel logs for detailed information about the upload failures:

```bash
tail -f storage/logs/laravel.log
``` 