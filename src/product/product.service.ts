import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ProductService {
  // Kho dữ liệu tạm, sinh một lần lúc Service được khởi tạo
  private readonly products = Array.from({ length: 20 }).map((_, i) => ({
    id: `backend_prod_${i}`,
    name: `Sản phẩm từ NestJS Server ${i}`,
    price: 1000000 + i * 10000,
    image: `https://picsum.photos/id/${200 + i}/400/400`,
  }));

  getAllProducts() {
    return this.products;
  }

  getProductById(id: string) {
    const product = this.products.find(
      (p) => p.id === id,
    );

    if (!product) {
      throw new NotFoundException(
        `Không tìm thấy sản phẩm có id = ${id}`,
      );
    }

    return product;
  }

  findRawById(id: string) {
    return this.products.find(
      (p) => p.id === id,
    ) ?? null;
  }
}