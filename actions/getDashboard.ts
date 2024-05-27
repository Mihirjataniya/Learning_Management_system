import { Category, Chapter, Course } from "@prisma/client";
import { db } from "@/lib/db";

type CourseWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
};

type DashboardCourses = {
  allCourses: CourseWithCategory[];
};

export const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId: userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              }
            }
          }
        }
      }
    });

    const allCourses = purchasedCourses.map((purchase) => purchase.course) as CourseWithCategory[];

    return {
      allCourses,
    }
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      allCourses: [],
    }
  }
}
