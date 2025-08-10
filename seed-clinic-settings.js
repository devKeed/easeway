// Seed script to create default clinic settings
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Check if settings already exist
  const existingSettings = await prisma.clinicSettings.findFirst();

  if (existingSettings) {
    console.log("Clinic settings already exist:", existingSettings);
    return;
  }

  // Create default settings
  const defaultSettings = await prisma.clinicSettings.create({
    data: {
      openingTime: "09:00",
      closingTime: "17:00",
      breakStart: "13:00",
      breakEnd: "14:00",
      blockedPeriods: [
        {
          start: "12:00",
          end: "12:30",
          reason: "Equipment maintenance",
        },
      ],
      workingDays: [1, 2, 3, 4, 5], // Monday to Friday
      timeSlotDuration: 30,
      isActive: true,
    },
  });

  console.log("Created default clinic settings:", defaultSettings);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
