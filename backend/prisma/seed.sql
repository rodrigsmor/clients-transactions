-- create customers

INSERT INTO
    customers (
        name,
        updatedAt,
        email,
        balance_amount,
        profile_picture
    )
VALUES (
        'JOSE CARLOS',
        NOW(),
        'jose@carlos.com',
        1000.00,
        'https://images.unsplash.com/photo-1569292316763-0b667e9e960c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    ), (
        'MARIA CANDIDA',
        NOW(),
        'mariacand@gmail.com',
        500.00,
        'https://images.unsplash.com/photo-1668020557706-0282786ed536?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    ), (
        'ELIANA NOGUEIRA',
        NOW(),
        'eliana@nogueira.com',
        2000.00,
        'https://images.unsplash.com/photo-1614381267044-dd2fcdc92ae0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    ), (
        'THIAGO OLIVEIRA',
        NOW(),
        'thiago@oliveira.com',
        0.00,
        'https://images.unsplash.com/photo-1616213920696-c678876f3898?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
    ), (
        'CARLOS BATISTA',
        NOW(),
        'carlos@batista.com',
        0.00,
        'https://images.unsplash.com/photo-1617885581080-c16afb2d79e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80'
    ), (
        'CAROLINA MACHADO',
        NOW(),
        'carolina@machado.com',
        0.00,
        'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    );

-- create products

INSERT INTO
    Product (name, ownerId)
VALUES ('CURSO DE BEM-ESTAR', 1), ('DOMINANDO INVESTIMENTOS', 2), ('DESENVOLVEDOR FULL STACK', 3);

-- create product affiliates

INSERT INTO _ProductAffiliate (A, B) VALUES (4, 1), (5, 3), (6, 3);