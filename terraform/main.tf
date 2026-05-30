provider "aws" {
  region = "us-east-1"
}

# 1. Bucket S3 con nombre único
resource "aws_s3_bucket" "angular_app" {
  bucket        = "mi-app-angular-semillero-devops" # Cambia esto por un nombre único
  force_destroy = true
}

# 2. Configurar el Bucket como sitio web estático
resource "aws_s3_bucket_website_configuration" "hosting" {
  bucket = aws_s3_bucket.angular_app.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html" # Angular maneja el enrutamiento internamente
  }
}

# 3. Desactivar el bloqueo de acceso público de AWS S3
resource "aws_s3_bucket_public_access_block" "publico" {
  bucket = aws_s3_bucket.angular_app.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# 4. Política para permitir que cualquiera lea los archivos (Necesario para una Web)
resource "aws_s3_bucket_policy" "permitir_acceso_publico" {
  depends_on = [aws_s3_bucket_public_access_block.publico]
  bucket     = aws_s3_bucket.angular_app.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.angular_app.arn}/*"
      }
    ]
  })
}