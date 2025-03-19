import basicComputerApplication from "@/assets/courses/basic-computer-application.png";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowRight, BookOpenText } from "lucide-react";
import CourseCard from "./courseCard";

export default function PopularCoursesSection() {
  return (
    <section className="pb-12 md:pb-16 lg:pb-20">
      <div className="container">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
          Popular <span className="text-gradient">Courses</span>
        </h2>
        <span className="text-center max-w-[600px] mx-auto text-gray-600 dark:text-[#ffefef] block mb-8 md:mb-12">
          Here are some of our popular courses. You can check these out! We
          offering a lot of courses also.
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <CourseCard
            thumbnail={basicComputerApplication}
            category="Basic Computer"
            title="Basic Computer Application"
            discountPrice={7999}
            regularPrice={12000}
            link="/courses/basic-computer-application"
            badgeText="Best Selling"
          />
          <CourseCard
            thumbnail={basicComputerApplication}
            category="Basic Computer"
            title="Basic Computer Application"
            discountPrice={7999}
            regularPrice={12000}
            link="/courses/basic-computer-application"
            badgeText="Best Selling"
          />
          <CourseCard
            thumbnail={basicComputerApplication}
            category="Basic Computer"
            title="Basic Computer Application"
            discountPrice={7999}
            regularPrice={12000}
            link="/courses/basic-computer-application"
            badgeText="Best Selling"
          />
          <CourseCard
            thumbnail={basicComputerApplication}
            category="Basic Computer"
            title="Basic Computer Application"
            discountPrice={7999}
            regularPrice={12000}
            link="/courses/basic-computer-application"
            badgeText="Best Selling"
          />
          <Link
            href="/courses"
            className="hidden lg:flex xl:hidden rounded-lg border border-gray-300 dark:border-[#5A2A2A] lg:py-16 bg-[#ffd8d8] dark:bg-[#472020] justify-center items-center"
          >
            <div className="flex items-center gap-2 text-xl font-medium text-primary">
              <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gradient text-white">
                <ArrowRight size={24} />
              </div>
              <span>View All</span>
            </div>
          </Link>
        </div>
        <div className="lg:hidden xl:block text-center mt-6 lg:mt-10">
          <Button size="lg" asChild>
            <Link href="/courses">
              <BookOpenText /> View All Courses
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
