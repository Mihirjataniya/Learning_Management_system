
const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer science and engineering" },
        { name: "Artificial intelligence and machine learning" },
        { name: "Internet of things" },
        { name: "WEB 3.0" },
        { name: "Blockchain technology" },
        { name: "Cloud Computing" },
        { name: "Finance" },
      ]
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();