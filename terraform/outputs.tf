# 5. Output para obtener la URL pública de la aplicación
output "bucket_name" {
  value       = aws_s3_bucket.angular_app.id
  description = "Nombre del bucket S3 utilizado en el pipeline"
}

output "website_url" {
  value       = aws_s3_bucket_website_configuration.hosting.website_endpoint
  description = "URL pública para acceder a la aplicación Angular"
}