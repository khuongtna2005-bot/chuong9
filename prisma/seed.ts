import { PrismaClient } from '@prisma/client';

import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword =
    await bcrypt.hash('123456', 10);

  await prisma.user.upsert({
    where: {
      email: 'demo@shopai.com',
    },
    update: {},
    create: {
      email: 'demo@shopai.com',
      password: hashedPassword,
      name: 'Học viên Demo',
    },
  });

  const products = Array.from({
    length: 20,
  }).map((_, i) => ({
    id: `backend_prod_${i}`,
    name: `Sản phẩm từ NestJS Server ${i}`,
    price: 1000000 + i * 10000,
    image: `https://picsum.photos/id/${200 + i}/400/400`,
  }));

  for (const product of products) {
    await prisma.product.upsert({
      where: {
        id: product.id,
      },
      update: {
        name: product.name,
        price: product.price,
        image: product.image,
      },
      create: product,
    });
  }

  console.log(
    'Seed User + Products thành công',
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());