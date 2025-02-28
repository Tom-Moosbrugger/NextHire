from app.models import db, CommonQuestion, environment, SCHEMA
from sqlalchemy.sql import text


def seed_common_questions():
    common_questions = [
        CommonQuestion(
            user_id=1,
            question="What motivates you to apply for this position?",
            response="I am highly motivated to apply for this position because it aligns perfectly with my skills, experiences, and long-term career goals. The opportunity to contribute to a company that values innovation and problem-solving is exciting to me. Over the years, I have developed strong analytical and technical skills that allow me to tackle challenges efficiently. Beyond my professional qualifications, I am particularly drawn to the company culture and values. A workplace that encourages collaboration, professional growth, and continuous learning is exactly the kind of environment where I thrive. Additionally, the job responsibilities mentioned in the description resonate deeply with my past experiences, making me confident that I can provide value from day one. Another aspect that excites me about this role is the opportunity to work with a team of talented professionals. I strongly believe in the power of teamwork, and I enjoy working alongside colleagues who challenge me and inspire me to grow. Finally, I see this role as a stepping stone for continuous learning and advancement. I am eager to take on new challenges, contribute meaningfully, and grow within the organization. This role offers the perfect combination of technical challenges, professional development opportunities, and a culture that aligns with my values.",
        ),
        CommonQuestion(
            user_id=1,
            question="Describe a time you faced a challenge at work and how you handled it.",
            response="In my previous role, I was responsible for managing a critical client project with a tight deadline. Midway through, one of our key team members had to leave due to unforeseen circumstances, which left a major gap in our workflow. The situation required quick thinking and decisive action to ensure the project stayed on track. My first step was to assess our current progress and redistribute tasks among the remaining team members, ensuring that everyone's strengths were utilized effectively. I also stepped in to handle some of the technical aspects myself, even though it was outside my usual responsibilities. Communication was key—I kept our client updated on the situation, set realistic expectations, and assured them we had a plan to meet our deadline. At the same time, I worked closely with my manager to find a temporary replacement for our missing team member. By leveraging teamwork, strategic planning, and open communication, we managed to deliver the project on time and exceed client expectations. This experience taught me the importance of adaptability, teamwork, and maintaining a solution-focused mindset in high-pressure situations.",
        ),
        CommonQuestion(
            user_id=1,
            question="How do you handle tight deadlines?",
            response="I handle tight deadlines by prioritizing tasks effectively, maintaining clear communication, and staying focused under pressure. First, I break down the project into manageable tasks and create a structured timeline, ensuring that each step contributes to the final goal. I also identify critical tasks that need immediate attention and allocate my time accordingly. Additionally, I believe in leveraging technology and productivity tools to streamline workflows and enhance efficiency. I am also proactive in seeking support when needed—whether that means collaborating with colleagues, delegating tasks where appropriate, or simply discussing priorities with my manager to ensure alignment. Another key aspect of handling deadlines is maintaining composure. Stress can be counterproductive, so I practice mindfulness and time management techniques to stay focused and efficient. Lastly, I always set aside time for review and quality checks to ensure that, despite the tight timeline, the final output meets high standards.",
        ),
        CommonQuestion(
            user_id=1,
            question="Why should we hire you over other candidates?",
            response="You should hire me because I bring a unique combination of technical expertise, problem-solving skills, and a strong work ethic. My background in [relevant field] has given me extensive hands-on experience, and I have consistently delivered results in previous roles. Beyond technical skills, I pride myself on being a fast learner and an adaptable team player. I thrive in fast-paced environments and am always willing to take on new challenges. My strong communication skills allow me to collaborate effectively with diverse teams, ensuring smooth project execution. Additionally, I am highly passionate about continuous learning and growth. I actively seek opportunities to improve my skills and stay updated with industry trends. If given the opportunity, I am confident that I will make meaningful contributions to your team and help drive success for the company.",
        ),
        CommonQuestion(
            user_id=1,
            question="Tell us about a time you worked in a team to accomplish a goal.",
            response="In my previous role, I worked on a project where our team had to develop a new feature for a client-facing application under a tight deadline. Our success relied on collaboration, clear communication, and efficient task management. My role involved coordinating between developers and designers to ensure seamless integration of components. We held daily stand-up meetings to track progress and quickly address any roadblocks. Throughout the process, I emphasized teamwork and transparency, ensuring everyone had the necessary resources to succeed. In the end, we successfully delivered the feature ahead of schedule, and the client was extremely satisfied.",
        ),
        CommonQuestion(
            user_id=1,
            question="What do you think makes a great leader?",
            response="A great leader is someone who inspires, empowers, and guides their team toward success. They lead by example, demonstrating integrity, accountability, and a strong work ethic. Leadership isn’t just about authority; it’s about fostering an environment where team members feel valued, heard, and motivated to perform at their best. A great leader actively listens to the team, encourages open communication, and ensures that everyone has the tools and resources they need to succeed. They are also resilient in the face of challenges and are able to make tough decisions when necessary. By fostering trust, creating a sense of shared purpose, and leading with empathy, great leaders motivate their teams to go above and beyond. The best leaders recognize that the success of the team depends on the collective effort of everyone, not just their own individual contributions.",
        ),
        CommonQuestion(
            user_id=1,
            question="What are your long-term career goals?",
            response="My long-term career goal is to continually grow and expand my expertise in [industry]. I aspire to take on leadership roles where I can contribute to strategic decision-making and mentor junior team members. I am particularly interested in [specific area] and hope to deepen my knowledge through hands-on experience and further education. I want to stay committed to improving my skills, staying informed about industry trends, and taking on increasingly complex projects. Over time, I hope to become a subject-matter expert in my field and take on responsibilities that will allow me to make a lasting impact on the organization.",
        ),
        CommonQuestion(
            user_id=1,
            question="How do you handle constructive criticism?",
            response="I view constructive criticism as an opportunity for growth. I actively listen, process feedback objectively, and implement suggestions to improve my performance. Instead of taking criticism personally, I use it as a learning tool to refine my skills and enhance my contributions. I also believe in seeking feedback proactively to identify areas where I can improve before problems arise. Ultimately, I see constructive criticism as a means to help me grow both personally and professionally, and I embrace it with a positive and open mindset.",
        ),
        CommonQuestion(
            user_id=1,
            question="What strategies do you use to stay organized?",
            response="To stay organized, I use a combination of digital tools and time management techniques. I maintain a detailed to-do list, prioritize tasks using the Eisenhower matrix, and set reminders to track deadlines. I also block out time on my calendar for specific tasks and regularly review my priorities. Consistent planning and review help me ensure that I stay focused and meet deadlines without becoming overwhelmed. Additionally, I have a habit of decluttering my workspace to minimize distractions, and I use cloud storage to keep all of my documents organized and easily accessible.",
        ),
        CommonQuestion(
            user_id=1,
            question="Describe a time you had to learn something new quickly.",
            response="In a previous role, I was tasked with leading a project involving a new software tool I had never used before. With limited time, I quickly familiarized myself by taking online courses, consulting colleagues, and experimenting with the tool in a test environment. I also attended webinars and read the software's documentation to understand its features and capabilities. Within a week, I was able to successfully implement the tool into our project workflow, and the project was completed on time. This experience taught me the value of adaptability, self-motivation, and utilizing available resources to quickly acquire new knowledge.",
        ),
    ]

    db.session.add_all(common_questions)
    db.session.commit()


def undo_common_questions():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.common_questions RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM common_questions"))

    db.session.commit()
