from app.models import db, ApplicationQuestion, environment, SCHEMA
from sqlalchemy.sql import text


def seed_application_questions():
    application_questions = [
        ApplicationQuestion(
            application_id=1,
            question="Describe a challenging project and your role in it.",
            response="In a recent project, our team faced a significant challenge integrating legacy systems with a new cloud-based platform. My role was to lead the integration efforts, which involved coordinating with multiple teams, understanding complex data flows, and resolving compatibility issues. To address this, I initiated a series of workshops to gather requirements and develop a comprehensive integration plan. I also established a communication channel to ensure regular updates and address any roadblocks. We implemented a phased approach, starting with a pilot integration to test the feasibility and identify potential issues. Through meticulous planning and proactive problem-solving, we successfully integrated the systems, resulting in improved efficiency and reduced operational costs. This experience reinforced the importance of collaboration, communication, and adaptability in overcoming complex technical challenges. I learned to anticipate potential issues, proactively address them, and communicate effectively with stakeholders to ensure project success. This project also taught me the importance of thorough documentation and knowledge sharing, which helped maintain consistency and facilitate future maintenance.",
        ),
        ApplicationQuestion(
            application_id=1,
            question="What are your long-term career goals?",
            response="My long-term career goals revolve around becoming a leader in the field of software engineering, specifically in the area of cloud computing and distributed systems. I aim to contribute to the development of innovative solutions that address real-world challenges and improve people's lives. I envision myself leading a team of talented engineers, fostering a culture of collaboration, innovation, and continuous learning. I also aspire to share my knowledge and experience with others through mentorship and participation in industry events. To achieve these goals, I plan to continue expanding my technical skills, stay updated with the latest technologies, and seek opportunities to take on leadership roles. I also intend to pursue advanced certifications and participate in industry conferences and workshops. Furthermore, I aim to build a strong professional network and seek guidance from experienced mentors. Ultimately, I want to make a meaningful impact on the industry and contribute to the advancement of technology.",
        ),
        ApplicationQuestion(
            application_id=1,
            question="Why are you interested in this position?",
            response="I am particularly interested in this position because it aligns perfectly with my skills, experience, and career aspirations. The opportunity to work on cutting-edge technologies and contribute to the development of innovative solutions is highly appealing to me. I am also drawn to the company's commitment to innovation and its reputation for fostering a collaborative and supportive work environment. The specific responsibilities of this role, such as designing and implementing scalable systems, are areas where I excel and am passionate about. I am confident that my problem-solving skills, technical expertise, and ability to work effectively in a team make me a strong candidate for this position. I am eager to learn from experienced professionals and contribute my own knowledge and skills to the team. I am also excited about the potential for growth and advancement within the company. I believe that this position offers a unique opportunity to make a significant impact and contribute to the company's success.",
        ),
        ApplicationQuestion(
            application_id=2,
            question="Explain your experience with agile methodologies.",
            response="Throughout my career, I've consistently employed agile methodologies, particularly Scrum, to manage software development projects. I've actively participated in sprint planning, daily stand-ups, sprint reviews, and retrospectives, fostering a collaborative and iterative development process. I've worked closely with product owners to define user stories, prioritize tasks, and ensure that the team's efforts align with the project goals. I understand the importance of breaking down complex projects into smaller, manageable sprints, allowing for flexibility and adaptability. I've also utilized agile tools, such as Jira, to track progress, manage backlogs, and facilitate communication among team members. I'm a strong advocate for continuous improvement and believe that agile methodologies provide a framework for delivering high-quality software in a timely and efficient manner. I've also experienced the benefit of agile in allowing for quick pivots when needed, and how it can help to reduce wasted effort. I have also used Kanban boards to manage workflow, and understand the value of visualizing the development process.",
        ),
        ApplicationQuestion(
            application_id=2,
            question="How do you handle tight deadlines?",
            response="When faced with tight deadlines, I prioritize tasks based on urgency and importance, breaking down large projects into smaller, manageable steps. I create a detailed plan and allocate time for each task, ensuring that I stay on track. I communicate regularly with team members and stakeholders to provide updates and address any potential roadblocks. I also leverage project management tools to track progress and manage dependencies. I'm adept at identifying potential bottlenecks and proactively addressing them to minimize delays. I understand the importance of maintaining a calm and focused approach, even under pressure. I also know when to ask for help, and that collaboration can be key to meeting tight deadlines. I have learned that clear communication and expectation management are vital in these situations, and that setting realistic goals is key to success. I also believe that a well-organized workspace and effective time management techniques are essential for meeting deadlines efficiently.",
        ),
        ApplicationQuestion(
            application_id=2,
            question="Describe your experience with database management.",
            response="I have extensive experience with database management, primarily using relational databases such as MySQL and PostgreSQL. I've designed and implemented database schemas, written complex SQL queries, and optimized database performance. I'm proficient in database administration tasks, including backup and recovery, security management, and performance monitoring. I've also worked with NoSQL databases, such as MongoDB, for projects requiring flexible data models and scalability. I understand the importance of data integrity and security, and I adhere to best practices for database design and management. I have used database modeling tools to design and document database schemas, and have experience with data migration and integration. I have experience with database indexing and query optimization, and understand the importance of database normalization. I am also familiar with database security best practices, such as encryption and access control. I have also worked with database version control systems to manage database schema changes.",
        ),
        ApplicationQuestion(
            application_id=3,
            question="What is your approach to problem-solving?",
            response="My approach to problem-solving is systematic and analytical. I begin by clearly defining the problem and gathering all relevant information. I then break down the problem into smaller, manageable components and analyze each component individually. I brainstorm potential solutions, evaluate their feasibility and effectiveness, and select the most appropriate solution. I implement the solution, monitor its effectiveness, and make adjustments as needed. I believe in a collaborative approach and often seek input from team members and stakeholders. I also document the problem-solving process and lessons learned to facilitate future problem-solving efforts. I am a firm believer in root cause analysis, and that understanding the underlying cause of a problem is essential for developing effective solutions. I also believe that it is important to consider the long-term impact of any solution, and that solutions should be sustainable and scalable. I strive to be creative and innovative in my problem-solving approach, and to think outside the box to find the best possible solutions.",
        ),
        ApplicationQuestion(
            application_id=3,
            question="How do you stay up-to-date with industry trends?",
            response="I stay up-to-date with industry trends through a combination of continuous learning, networking, and active participation in industry events. I regularly read industry publications, blogs, and research papers to stay informed about the latest technologies and best practices. I attend industry conferences, workshops, and webinars to learn from experts and network with peers. I also participate in online communities and forums to exchange ideas and gain insights from other professionals. I am a member of professional organizations and participate in their activities and events. I also follow industry leaders and influencers on social media to stay informed about their latest insights and perspectives. I am also a frequent reader of technical documentation and open source project repositories. I believe that continuous learning is essential for staying competitive in the rapidly evolving tech industry.",
        ),
        ApplicationQuestion(
            application_id=3,
            question="Describe a time you had to learn a new skill quickly.",
            response="In a recent project, I was tasked with integrating a new third-party API that I had no prior experience with. The project had a tight deadline, so I had to quickly learn the API's documentation and develop a working integration. I started by thoroughly reviewing the API's documentation and examples. I also searched for online tutorials and resources to gain a better understanding of the API's functionality. I then began experimenting with the API, writing sample code and testing its various endpoints. I encountered several challenges along the way, but I persisted and sought help from online communities and forums. Through focused effort and determination, I was able to successfully integrate the API within the given timeframe. This experience taught me the importance of adaptability and the ability to learn new skills quickly. I also learned the value of breaking down complex tasks into smaller, manageable steps, and the importance of seeking help when needed.",
        ),
    ]

    db.session.add_all(application_questions)
    db.session.commit()


def undo_application_questions():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.application_questions RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM application_questions"))

    db.session.commit()
