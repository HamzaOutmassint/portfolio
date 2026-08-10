import { CaseStudyImage, NumberedBlock, Overview } from "@/components/work/CaseStudyPrimitives";

export function RemediaCaseStudy() {
  return (
    <div className="page-shell case-study-content py-[var(--section-space)]">
      <CaseStudyImage
        src="/projects/remedia/change-done.png"
        alt="Remedia assignment review interface showing student coursework, critical issues, rubric scores and feedback"
        width={1493}
        height={1083}
        priority
      />

      <div className="mt-[var(--case-study-space)]">
        <Overview detail="The interface keeps assignments, scoring criteria and written feedback in the same working context.">
          A considered assessment workflow for reading, reviewing and responding to student work.
        </Overview>
      </div>

      <div className="mt-[var(--case-study-space)] grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-9 lg:col-start-4">
          <CaseStudyImage
            src="/projects/remedia/assignments-table.png"
            alt="Remedia assignments table with classwork, subjects, grades and assignment actions"
            width={1578}
            height={997}
            sizes="(max-width: 1023px) calc(100vw - 2.5rem), (max-width: 1600px) 70vw, 1120px"
          />
        </div>
        <div className="lg:col-span-3 lg:col-start-1 lg:row-start-1">
          <NumberedBlock number="01" title="Assignment management">
            A clear overview of classwork makes it easy to scan formats, subjects, grades and the next action.
          </NumberedBlock>
        </div>
      </div>

      <div className="mt-[var(--case-study-space)] grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-8">
          <CaseStudyImage
            src="/projects/remedia/new-rubric.png"
            alt="Remedia rubric builder for creating assessment criteria and score levels"
            width={1535}
            height={1024}
            sizes="(max-width: 1023px) calc(100vw - 2.5rem), (max-width: 1600px) 63vw, 1010px"
          />
        </div>
        <div className="lg:col-span-3 lg:col-start-10 lg:pt-16">
          <NumberedBlock number="02" title="Structured assessment">
            Rubrics turn expectations into a practical scoring framework, with room for specific corrections and feedback.
          </NumberedBlock>
        </div>
      </div>

      <div className="mt-[var(--case-study-space)] grid gap-12 lg:grid-cols-2 lg:gap-8">
        <NumberedBlock number="01" title="Challenge">
          Bring coursework, evaluation and guidance together without obscuring the student’s work.
        </NumberedBlock>
        <NumberedBlock number="02" title="Solution">
          A single review view balances the original submission with critical issues, scores and actionable feedback.
        </NumberedBlock>
      </div>
    </div>
  );
}
