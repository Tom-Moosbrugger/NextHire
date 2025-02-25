from app.models import db, Application, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


def seed_applications():
    applications = [
        Application(
            user_id=1,
            application_status="Submitted",
            company_name="Google",
            company_website="https://careers.google.com",
            job_title="Software Engineer",
            job_details="Develop scalable web applications and collaborate with cross-functional teams.",
            job_post_url="https://careers.google.com/jobs/results/123456789/",
            submission_details="Submitted via company website. Used referral from a former colleague.",
            application_deadline=date(2025, 3, 15),
            cover_letter_url="https://nexthire-storage.s3.us-west-1.amazonaws.com/1bd20c31d1fc44138327d7c6633f7751.pdf",
            resume_url="http://nexthire-storage.s3.amazonaws.com/9280e8e695904978b65dbf0424af54e7.pdf",
            date_submitted=date(2025, 3, 13),
        ),
        Application(
            user_id=1,
            application_status="Interviewing",
            company_name="Amazon",
            company_website="https://www.amazon.jobs",
            job_title="Backend Engineer",
            job_details="Build and optimize cloud-based services for high-volume e-commerce transactions.",
            job_post_url="https://www.amazon.jobs/en/jobs/987654321/",
            submission_details="Applied through LinkedIn. Contacted by recruiter for initial screening.",
            application_deadline=date(2025, 4, 10),
            cover_letter_url="https://nexthire-storage.s3.us-west-1.amazonaws.com/22185bcf472c43c39ae13564e483788e.pdf",
            resume_url="https://nexthire-storage.s3.us-west-1.amazonaws.com/2be649e3bef14cc29c71f3ee99bbd1d1.pdf",
        ),
        Application(
            user_id=1,
            application_status="Upcoming",
            company_name="Apple",
            company_website="https://jobs.apple.com",
            job_title="iOS Developer",
            job_details="Design and implement new features for iOS applications used by millions.",
            job_post_url="https://jobs.apple.com/en-us/details/111222333/",
            submission_details="Saw job posting on Twitter. Planning to submit application this week.",
            application_deadline=date(2025, 5, 1),
            cover_letter_url="http://nexthire-storage.s3.amazonaws.com/dd82bef4c3c249d38a0d056f40364da4.pdf",
            resume_url="http://nexthire-storage.s3.amazonaws.com/b977b50f8cb74cd5a1c6762d20b2e25f.pdf",
        ),
        Application(
            user_id=1,
            application_status="Rejected",
            company_name="Meta",
            company_website="https://www.metacareers.com",
            job_title="Data Scientist",
            job_details="Analyze large datasets to improve machine learning models for social media platforms.",
            job_post_url="https://www.metacareers.com/v2/jobs/654321098/",
            submission_details="Completed coding challenge and first interview, but did not advance.",
            application_deadline=date(2025, 2, 20),
            cover_letter_url="http://nexthire-storage.s3.amazonaws.com/771c4bb7ff134e28ab7e4776aed9013c.pdf",
            resume_url="http://nexthire-storage.s3.amazonaws.com/491cee5718be42e1933d856c39652d02.pdf",
        ),
        Application(
            user_id=1,
            application_status="Offered",
            company_name="Microsoft",
            company_website="https://careers.microsoft.com",
            job_title="Cloud Engineer",
            job_details="Develop cloud computing solutions for enterprise clients using Azure technologies.",
            job_post_url="https://careers.microsoft.com/us/en/job/444555666/",
            submission_details="Received offer after final interview. Negotiated salary and benefits package.",
            application_deadline=date(2025, 3, 5),
            cover_letter_url="http://nexthire-storage.s3.amazonaws.com/de363b71812848a3ae053a44030e9544.pdf",
            resume_url="http://nexthire-storage.s3.amazonaws.com/eca12980951347ce8778b34d8d266e5b.pdf",
        ),
        Application(
            user_id=1,
            application_status="Upcoming",
            company_name="Spotify",
            company_website="https://www.spotify.com",
            job_title="Music Data Scientist",
            job_details="Analyze music data to improve recommendation algorithms and user experience.",
            job_post_url="https://www.spotifyjobs.com/jobs/123456/",
            submission_details="Plan to apply once I've completed a personal data science project.",
            application_deadline=date(2025, 6, 25),
            cover_letter_url="http://nexthire-storage.s3.amazonaws.com/3d2652beb8a04100ac8a88a3abce1051.pdf",
            resume_url="http://nexthire-storage.s3.amazonaws.com/31115c5ba7d34521a91df0cdc3a01f0f.pdf",
        ),
        Application(
            user_id=1,
            application_status="Upcoming",
            company_name="Airbnb",
            company_website="https://www.airbnb.com",
            job_title="Backend Engineer",
            job_details="Design and implement APIs for Airbnb's global platform.",
            job_post_url="https://www.airbnb.com/careers/jobs/654321/",
            submission_details="Preparing portfolio and need to update resume before submission.",
            application_deadline=date(2025, 5, 18),
            cover_letter_url="http://nexthire-storage.s3.amazonaws.com/50502d0b6023469a8d251cb8f41ff503.pdf",
            resume_url="http://nexthire-storage.s3.amazonaws.com/e004285abace4ff0ad1303600f0dfee0.pdf",
        ),
        Application(
            user_id=1,
            application_status="Upcoming",
            company_name="Slack",
            company_website="https://www.slack.com",
            job_title="Product Manager",
            job_details="Lead product development for collaborative tools used by teams worldwide.",
            job_post_url="https://slack.com/careers/jobs/789012/",
            submission_details="Need to complete application questions before applying.",
            application_deadline=date(2025, 7, 10),
            cover_letter_url="http://nexthire-storage.s3.amazonaws.com/9ebeea83238744d1ba5bab21cc86a075.pdf",
            resume_url="http://nexthire-storage.s3.amazonaws.com/62f1ba0a71d5404794d192464db792da.pdf",
        ),
        Application(
            user_id=1,
            application_status="Upcoming",
            company_name="Adobe",
            company_website="https://www.adobe.com",
            job_title="UX Designer",
            job_details="Design user-centered experiences for Adobe's creative software suite.",
            job_post_url="https://www.adobe.com/careers/jobs/345678/",
            submission_details="Applying after attending the Adobe design conference next month.",
            application_deadline=date(2025, 8, 2),
            cover_letter_url="http://nexthire-storage.s3.amazonaws.com/aff24811a88a40eaa1dbba4650b00556.pdf",
            resume_url="http://nexthire-storage.s3.amazonaws.com/595866b8dd7341398be49e907647cb4c.pdf",
        ),
        Application(
            user_id=1,
            application_status="Upcoming",
            company_name="Zoom",
            company_website="https://www.zoom.us",
            job_title="Cloud Solutions Architect",
            job_details="Design and implement cloud infrastructure for scalable video conferencing solutions.",
            job_post_url="https://zoom.us/careers/job/901234/",
            submission_details="Finalizing LinkedIn profile before submitting application.",
            application_deadline=date(2025, 9, 15),
            cover_letter_url="http://nexthire-storage.s3.amazonaws.com/95c11f746cf5439491a07fb5471d0413.pdf",
            resume_url="http://nexthire-storage.s3.amazonaws.com/6bf0b516fc36411ab84921b4522f4fa1.pdf",
        ),
    ]

    db.session.add_all(applications)
    db.session.commit()


def undo_applications():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.applications RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM applications"))

    db.session.commit()
