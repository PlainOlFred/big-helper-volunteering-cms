-- Charity

INSERT INTO `big_helper_db`.`charity` (name, email) 
    VALUES 
    ("Helping Hands", "hhCharity@examlpe.com"),
    ("One For One", "ofoCharity@examlpe.com"),
    ("Yos and Us", "yauCharity@examlpe.com");

-- Team

INSERT INTO `big_helper_db`.`team` (name, team_leader)
    VALUES
    ('Red Team', 2),
    ('Blue Team', 3);


-- Volunteer

INSERT INTO `big_helper_db`.`volunteer` (first_name, last_name, location_role, team_team_id, charity_charity_id) 
    VALUES 
    ("Bill", "Holmes", "ADMIN", 1 , 1),
    ("Tom", "Holmes", "SUPER", 1 , 1),
    ("Sally", "Edwards", "SUPER", 1 , 2),
    ("Rick", "Jones", "TEAM_MEMBER", 1 , 1),
    ("Sarah", "Jones", "TEAM_MEMBER", 1 , 1),
    ("Tim", "Johnson", "TEAM_MEMBER", 2 , 1),
    ("Ricky", "Mack", "TEAM_MEMBER", 2 , 2),
    ("Mary", "Mack", "TEAM_MEMBER", 2 , 2);


INSERT INTO `big_helper_db`.`project` (name, date_started, date_target, date_completed, description, charity_charity_id, team_team_id)
    VALUES
    ("Project 1", "1-1-2020", null, null, " description p1", 1, 1),
    ("Project 2", "1-1-2020", null, null, " description p2", 1, 1);


INSERT INTO `big_helper_db`.`task` (project_id, volunteer_id, status)
    VALUES
    (1,2, "ASSIGNED"),
    (1,2, "ASSIGNED"),
    (2,4, "ASSIGNED"),
    (2,4, "ASSIGNED"),
    (2,4, "ASSIGNED"),
    (2,4, "ASSIGNED");




  
