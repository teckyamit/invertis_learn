// Semester 3 subjects for B.Tech CSE (Cloud Computing)

const SEMESTER_3_SUBJECTS = [
  {
    code: "BCSI301",
    name: "Statistics and Probability",
    subjectType: "THEORY",
    credits: 4.0,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    evaluationMarks: "CA: 30, EE: 70, Total: 100",
    syllabusDetails: {
      objectives: [
        "To introduce statistical descriptive methods, discrete and continuous probability distributions, hypothesis testing, and regression analysis for computing sciences."
      ],
      outcomes: [
        "Calculate mean, variance, moments, skewness, and kurtosis for empirical datasets.",
        "Apply binomial, Poisson, and normal probability models to real-world engineering problems.",
        "Perform hypothesis testing using t-test, z-test, chi-square test, and ANOVA."
      ],
      modules: [
        {
          title: "UNIT -I: Descriptive Statistics",
          topics: "Measures of central tendency (mean, median, mode); Measures of dispersion (range, quartile deviation, mean deviation, standard deviation, variance, coefficient of variation); Moments, skewness, and kurtosis; Curve fitting by the method of least squares (fitting linear, parabolic, and exponential curves)."
        },
        {
          title: "UNIT -II: Probability & Random Variables",
          topics: "Axiomatic definition of probability; Conditional probability, multiplication theorem, Bayes' theorem; Random variables: Discrete and continuous random variables; Probability Mass Function (PMF), Probability Density Function (PDF), Cumulative Distribution Function (CDF); Mathematical expectation, variance, and moment generating functions (MGF)."
        },
        {
          title: "UNIT -III: Probability Distributions",
          topics: "Discrete distributions: Binomial distribution, Poisson distribution, Geometric distribution; Continuous distributions: Uniform distribution, Exponential distribution, Normal (Gaussian) distribution, standard normal distribution and properties, central limit theorem."
        },
        {
          title: "UNIT -IV: Correlation & Regression",
          topics: "Bivariate data; Scatter diagram; Karl Pearson's coefficient of correlation; Spearman's rank correlation coefficient; Regression equations and regression lines; Angle between two lines of regression; Standard error of estimate."
        },
        {
          title: "UNIT -V: Testing of Hypothesis & Analysis of Variance",
          topics: "Sampling distributions; Null and alternative hypothesis; Type-I and Type-II errors, level of significance; Large sample tests (z-test for single mean and difference of means); Small sample tests (Student's t-test for single mean, difference of means, paired t-test); Chi-square test for goodness of fit and independence of attributes; One-way and two-way Analysis of Variance (ANOVA)."
        }
      ],
      textBooks: [
        "S.C. Gupta & V.K. Kapoor, 'Fundamentals of Mathematical Statistics', Sultan Chand & Sons.",
        "Sheldon M. Ross, 'Introduction to Probability and Statistics for Engineers and Scientists', Academic Press."
      ],
      referenceBooks: [
        "Walpole, Myers, Myers & Ye, 'Probability and Statistics for Engineers and Scientists', Pearson.",
        "B.S. Grewal, 'Higher Engineering Mathematics', Khanna Publishers."
      ]
    }
  },
  {
    code: "BCSI302",
    name: "Digital Electronics",
    subjectType: "THEORY",
    credits: 4.0,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    evaluationMarks: "CA: 30, EE: 70, Total: 100",
    syllabusDetails: {
      objectives: [
        "To teach combinatorial and sequential digital logic circuit design, minimization techniques, and memory systems."
      ],
      outcomes: [
        "Simplify Boolean expressions using Karnaugh maps and Quine-McCluskey tabulation.",
        "Design combinational circuits like adders, subtractors, multiplexers, and decoders.",
        "Design and analyze synchronous and asynchronous sequential circuits, flip-flops, counters, and registers."
      ],
      modules: [
        {
          title: "UNIT -I: Boolean Algebra & Logic Simplification",
          topics: "Review of number systems and codes (BCD, Gray, Excess-3); Axiomatic definition of Boolean algebra and theorems; Canonical and standard forms; Karnaugh map (up to 5 variables), Don't care conditions; Prime implicants; Quine-McCluskey tabular minimization; Logic gates and universal gates implementation."
        },
        {
          title: "UNIT -II: Combinational Logic Circuits",
          topics: "Design of adders: Half adder, Full adder, Ripple carry adder, Carry look-ahead adder; Subtractors: Half and Full subtractors; Binary parallel adder/subtractor; BCD adder; Magnitude comparator; Decoders (3:8, 4:16) and Encoders (Priority encoder); Multiplexers (4:1, 8:1) and Demultiplexers; Design of combinational circuits using MUX and Decoders; Code converters."
        },
        {
          title: "UNIT -III: Sequential Logic Circuits",
          topics: "Latches and Flip-Flops: SR, D, JK, T and Master-Slave JK flip-flops; Triggering of flip-flops; Characteristic tables, characteristic equations, and excitation tables; Conversion between flip-flops; Timing considerations, setup and hold times."
        },
        {
          title: "UNIT -IV: Registers & Counters",
          topics: "Registers: Shift registers (SISO, SIPO, PISO, PIPO), Universal shift register, Ring counter, Johnson counter; Counters: Asynchronous (ripple) counters (up, down, mod-N); Synchronous counters design; Up/Down synchronous counter; Sequence generators and State machine design with SM charts."
        },
        {
          title: "UNIT -V: Memory & Programmable Logic",
          topics: "Memory hierarchy: RAM (SRAM, DRAM), ROM (PROM, EPROM, EEPROM, Flash); Memory decoding and expansion; Programmable Logic Devices (PLDs): Programmable Logic Array (PLA), Programmable Array Logic (PAL), Complex PLDs (CPLD), Field Programmable Gate Arrays (FPGA) architecture; Digital logic families (TTL, CMOS, ECL) characteristics."
        }
      ],
      textBooks: [
        "M. Morris Mano & Michael D. Ciletti, 'Digital Design: With an Introduction to the Verilog HDL', Pearson.",
        "R.P. Jain, 'Modern Digital Electronics', Tata McGraw Hill."
      ],
      referenceBooks: [
        "Donald P. Leach & Albert Paul Malvino, 'Digital Principles and Applications', McGraw Hill.",
        "Charles H. Roth Jr. & Larry L. Kinney, 'Fundamentals of Logic Design', Cengage Learning."
      ]
    }
  },
  {
    code: "BCSI303",
    name: "Data Structures using C",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To introduce linear and non-linear data structures, algorithm efficiency, dynamic memory operations, and sorting/searching."
      ],
      outcomes: [
        "Analyze algorithm time and space complexity using asymptotic Big-O notations.",
        "Implement stacks, queues, linked lists, binary search trees, and graphs in C.",
        "Apply efficient sorting and hashing techniques to manage structured collections."
      ],
      modules: [
        {
          title: "UNIT -I: Introduction to Data Structures & Arrays",
          topics: "Concept of Data Structures, Abstract Data Types (ADT); Algorithm complexity: Time and Space complexity, Asymptotic notations (Big O, Omega, Theta); Arrays: Memory representation (row-major and column-major), Operations on arrays, Sparse matrices and representation."
        },
        {
          title: "UNIT -II: Stacks & Queues",
          topics: "Stack ADT: Array and linked representations, Push, Pop, Peek; Applications: Infix to Postfix conversion, Evaluation of Postfix expressions, Recursion simulation; Queue ADT: Array and linked representations; Circular queue, Deque (Double-ended queue), Priority queue and applications."
        },
        {
          title: "UNIT -III: Linked Lists",
          topics: "Singly Linked List: Traversal, insertion, deletion, searching, reversing; Circular Linked List; Doubly Linked List: Operations and applications; Header linked lists; Polynomial representation and addition using linked lists."
        },
        {
          title: "UNIT -IV: Trees & Binary Search Trees",
          topics: "Tree terminology; Binary Trees: Types, properties, array and linked representation; Binary Tree Traversals: Preorder, Inorder, Postorder, Level order; Binary Search Tree (BST): Insertion, deletion, searching; Balanced Trees: AVL trees (rotations and insertions), Introduction to B-Trees and Heaps."
        },
        {
          title: "UNIT -V: Graphs, Searching & Sorting",
          topics: "Graph definitions and representations (Adjacency matrix, Adjacency list); Graph Traversals: Depth First Search (DFS), Breadth First Search (BFS); Spanning trees: Prim's and Kruskal's algorithms; Shortest path: Dijkstra's algorithm; Searching: Linear and Binary search; Sorting: Bubble sort, Selection sort, Insertion sort, Merge sort, Quick sort, Radix sort; Hashing: Hash functions, collision resolution techniques."
        }
      ],
      textBooks: [
        "Reema Thareja, 'Data Structures Using C', Oxford University Press.",
        "Ellis Horowitz, Sartaj Sahni & Susan Anderson-Freed, 'Fundamentals of Data Structures in C', Silicon Press."
      ],
      referenceBooks: [
        "Aaron M. Tenenbaum et al., 'Data Structures Using C', Prentice Hall.",
        "Seymour Lipschutz, 'Data Structures', Schaum's Outlines, McGraw Hill."
      ]
    }
  },
  {
    code: "BCSI304",
    name: "Object Oriented Programming with Java",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To teach object-oriented software development using Java, including classes, inheritance, polymorphism, interfaces, multithreading, and collections."
      ],
      outcomes: [
        "Implement OOP principles: Encapsulation, Inheritance, Polymorphism, and Abstraction in Java.",
        "Build robust programs with Java Exception Handling and custom exceptions.",
        "Utilize Multithreading, I/O Streams, and the Java Collections Framework."
      ],
      modules: [
        {
          title: "UNIT -I: Java Basics & OOP Concepts",
          topics: "OOP paradigm vs. Procedure Oriented; Features of Java; JVM, JRE, JDK architecture; Bytecode and platform independence; Primitive types, variables, type casting; Operators and control statements; Classes, objects, methods, constructors, constructor overloading; 'this' keyword, garbage collection, and finalize method."
        },
        {
          title: "UNIT -II: Inheritance, Polymorphism & Interfaces",
          topics: "Inheritance: Types of inheritance, 'super' keyword, method overriding, dynamic method dispatch; Abstract classes; 'final' keyword with variables, methods, and classes; Interfaces: Defining and implementing interfaces, multiple inheritance via interfaces, default and static methods in interfaces."
        },
        {
          title: "UNIT -III: Packages, Exception Handling & Strings",
          topics: "Packages: Defining, creating, and accessing packages; Access protection; Exception Handling: try, catch, nested try, throw, throws, finally; Built-in exceptions and creating custom exceptions; Strings: String, StringBuilder, and StringBuffer classes, string manipulation methods."
        },
        {
          title: "UNIT -IV: Multithreading & I/O Streams",
          topics: "Java Thread Model: Life cycle of a thread; Creating threads by extending Thread class and implementing Runnable interface; Thread priorities; Synchronization: Synchronized methods and statements, inter-thread communication (wait, notify, notifyAll); Java I/O: Byte streams, Character streams, File input/output, Serialization and Deserialization."
        },
        {
          title: "UNIT -V: Java Collections Framework & Generics",
          topics: "Generics: Generic classes, methods, and wildcards; Collections Overview: Collection interface, List (ArrayList, LinkedList, Vector), Set (HashSet, LinkedHashSet, TreeSet), Queue (PriorityQueue, ArrayDeque), Map (HashMap, TreeMap, LinkedHashMap); Iterators and for-each loop; Comparable and Comparator interfaces."
        }
      ],
      textBooks: [
        "Herbert Schildt, 'Java: The Complete Reference', 12th Edition, McGraw Hill.",
        "E. Balagurusamy, 'Programming with Java: A Primer', McGraw Hill."
      ],
      referenceBooks: [
        "Kathy Sierra & Bert Bates, 'Head First Java', O'Reilly Media.",
        "Joshua Bloch, 'Effective Java', Addison-Wesley."
      ]
    }
  },
  {
    code: "BCSI305",
    name: "Database Management System",
    subjectType: "THEORY",
    credits: 3.0,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: {
      objectives: [
        "To teach relational database design, entity-relationship modeling, relational algebra, SQL querying, normalization, transaction processing, and concurrency control."
      ],
      outcomes: [
        "Design conceptual database schemas using ER and Extended ER diagrams.",
        "Write complex SQL queries, views, constraints, triggers, and stored procedures.",
        "Apply normalization up to BCNF and ensure ACID properties and serializability."
      ],
      modules: [
        {
          title: "UNIT -I: Introduction to DBMS & Conceptual Modeling",
          topics: "Database system concepts and architecture; File system vs. DBMS; Data models, schemas, and instances; Three-schema architecture and data independence; Entity-Relationship (ER) model: Entities, attributes, entity sets, relationships, cardinalities; Strong and weak entities; Enhanced ER (EER) modeling: Specialization, generalization, and aggregation; Mapping ER models to relational schemas."
        },
        {
          title: "UNIT -II: Relational Model & SQL",
          topics: "Relational model concepts: Domains, attributes, tuples, relations; Relational integrity constraints: Domain, key, entity, and referential integrity; Relational Algebra operations: Select, Project, Join, Set operations, Division; SQL: DDL, DML, DCL, TCL; Nested subqueries, joins (inner, outer), aggregate functions, GROUP BY, HAVING; Views, indexes, sequences."
        },
        {
          title: "UNIT -III: Relational Database Design & Normalization",
          topics: "Informal design guidelines; Functional dependencies: Inference rules (Armstrong's axioms), closure of FD set and attributes; Normalization: 1NF, 2NF, 3NF, Boyce-Codd Normal Form (BCNF); Multi-valued dependencies and 4NF; Lossless-join decomposition and dependency preservation."
        },
        {
          title: "UNIT -IV: Transaction Management & Concurrency Control",
          topics: "Transaction concepts and states; ACID properties; Schedules and recoverability; Serializability: Conflict serializability and view serializability; Concurrency control protocols: Two-Phase Locking (2PL), strict and rigorous 2PL; Timestamp ordering protocol; Deadlock handling: Prevention, detection, and recovery."
        },
        {
          title: "UNIT -V: Database Recovery, Security & Modern Databases",
          topics: "Failure classification; Recovery concepts: Log-based recovery (deferred and immediate update), Checkpoints, Shadow paging; Database security and authorization: GRANT, REVOKE; Introduction to distributed databases; Overview of NoSQL databases: Key-value, document, column-family, and graph databases."
        }
      ],
      textBooks: [
        "Abraham Silberschatz, Henry F. Korth & S. Sudarshan, 'Database System Concepts', 7th Edition, McGraw Hill.",
        "Ramez Elmasri & Shamkant B. Navathe, 'Fundamentals of Database Systems', Pearson."
      ],
      referenceBooks: [
        "Raghu Ramakrishnan & Johannes Gehrke, 'Database Management Systems', McGraw Hill.",
        "C.J. Date, 'An Introduction to Database Systems', Addison-Wesley."
      ]
    }
  },
  {
    code: "IIOT3",
    name: "Introduction to Data Analytics",
    subjectType: "THEORY",
    credits: 4.0,
    lectureHours: 4,
    tutorialHours: 0,
    practicalHours: 0,
    evaluationMarks: "CA: 30, EE: 70, Total: 100",
    syllabusDetails: {
      objectives: [
        "To introduce data science lifecycles, data wrangling, exploratory data analysis (EDA), statistical inference, and predictive modeling using Python."
      ],
      outcomes: [
        "Clean, transform, and aggregate structured datasets using NumPy and Pandas.",
        "Visualize data distributions, trends, and correlations using Matplotlib and Seaborn.",
        "Build foundational regression, classification, and clustering models for business analytics."
      ],
      modules: [
        {
          title: "Unit 1: Data Analytics Foundations & Python",
          topics: "Overview of data analytics lifecycle: Discovery, preparation, planning, modeling, communicating results; Python environment: Jupyter Notebooks, Anaconda; NumPy arrays: Slicing, indexing, broadcasting, mathematical and linear algebra routines."
        },
        {
          title: "Unit 2: Data Wrangling with Pandas",
          topics: "Pandas Series and DataFrames; Importing CSV, Excel, JSON, and SQL data; Handling missing data (imputation, dropping); Data transformation: Filtering, sorting, grouping, pivoting, merging, joining, and concatenating; String and date-time operations."
        },
        {
          title: "Unit 3: Exploratory Data Analysis & Visualization",
          topics: "Descriptive statistics; Outlier detection using IQR and Z-scores; Visualizing distributions: Histograms, KDE plots, box plots; Categorical plots: Bar charts, count plots; Relational plots: Scatter plots, pair plots, correlation heatmaps using Matplotlib and Seaborn."
        },
        {
          title: "Unit 4: Statistical Modeling & Hypothesis Testing",
          topics: "Sampling methods and distributions; Confidence intervals; Hypothesis formulation; Parametric vs. non-parametric tests; Two-sample t-tests, ANOVA, Chi-Square contingency tables in Python using SciPy and Statsmodels."
        },
        {
          title: "Unit 5: Predictive Analytics & Scikit-Learn Basics",
          topics: "Supervised vs. unsupervised learning; Linear regression and multivariate regression; Logistic regression for binary classification; Evaluation metrics: Accuracy, Precision, Recall, F1-Score, Confusion Matrix, ROC-AUC; K-Means clustering basics."
        }
      ],
      textBooks: [
        "Wes McKinney, 'Python for Data Analysis', 3rd Edition, O'Reilly Media.",
        "Jake VanderPlas, 'Python Data Science Handbook', O'Reilly Media."
      ],
      referenceBooks: [
        "Cathy O'Neil & Rachel Schutt, 'Doing Data Science', O'Reilly Media."
      ]
    }
  },
  {
    code: "BCSI306",
    name: "Communication Skills",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To develop professional verbal skills, technical discussion facilitation, and career interview strategies."],
      outcomes: ["Conduct professional technical presentations and excel in collaborative engineering team discourse."],
      labExperiments: [
        "Technical Seminar Presentation: Researching, structuring, and delivering slides on emerging cloud computing trends.",
        "Panel Discussion & Debate: Formulating logical arguments on technology ethics and artificial intelligence.",
        "Role-Playing Customer Client Interactions: Eliciting software requirements and handling technical clarifications.",
        "Executive Summary Drafting: Distilling complex technical documentation into one-page executive briefs."
      ]
    }
  },
  {
    code: "BCSI307",
    name: "Data Structures using C Lab",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To implement linear and non-linear data structures and sorting algorithms in C language."],
      outcomes: ["Write programs for linked lists, stacks, queues, trees, and graphs, verifying time/space complexity."],
      labExperiments: [
        "Implementation of Array operations: Traversal, insertion, deletion, and searching in C.",
        "Implementation of Stack using array and linked list with push, pop, and peek operations.",
        "Application of Stack: Conversion of Infix expression to Postfix expression and Postfix evaluation.",
        "Implementation of Linear Queue and Circular Queue using arrays.",
        "Implementation of Singly Linked List with insertion at beginning/end/position and node deletion.",
        "Implementation of Doubly Linked List with bidirectional traversal and node removal.",
        "Implementation of Binary Search Tree (BST): Insertion, deletion, and Inorder/Preorder/Postorder traversals.",
        "Implementation of Graph traversal algorithms: Breadth First Search (BFS) and Depth First Search (DFS).",
        "Implementation of Sorting algorithms: Insertion Sort, Quick Sort, Merge Sort, and Heap Sort."
      ]
    }
  },
  {
    code: "BCSI308",
    name: "Object Oriented Programming with Java Lab",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To practice object-oriented design and programming in Java using Eclipse/IntelliJ/CLI."],
      outcomes: ["Create robust Java applications with OOP classes, inheritance, interfaces, exceptions, threads, and collections."],
      labExperiments: [
        "Write a Java program to illustrate class, objects, constructors, and method overloading.",
        "Write a Java program to demonstrate single, multilevel, and hierarchical inheritance using 'super'.",
        "Write a Java program to implement dynamic method dispatch and runtime polymorphism.",
        "Write a Java program demonstrating multiple inheritance through interfaces.",
        "Write a Java program to implement custom user-defined exceptions and chained exceptions.",
        "Write a Java multithreaded program creating threads via Thread class and Runnable interface.",
        "Write a Java program demonstrating thread synchronization using synchronized blocks and wait/notify.",
        "Write a Java program utilizing ArrayList, HashMap, and HashSet from Collections Framework.",
        "Write a Java program to read and write binary/text files using File streams and object serialization."
      ]
    }
  },
  {
    code: "BCSI309",
    name: "Database Management Systems Lab",
    subjectType: "PRACTICAL",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To design relational database schemas, write SQL queries, implement constraints, triggers, and PL/SQL."],
      outcomes: ["Construct relational databases and execute DDL/DML commands and stored procedures in Oracle/MySQL."],
      labExperiments: [
        "Creation of tables using DDL commands (CREATE, ALTER, DROP) with primary key, foreign key, NOT NULL, UNIQUE, CHECK constraints.",
        "Execution of DML commands (INSERT, UPDATE, DELETE) and transaction controls (COMMIT, ROLLBACK, SAVEPOINT).",
        "Writing complex SELECT queries utilizing WHERE, BETWEEN, LIKE, ORDER BY, GROUP BY, and HAVING clauses.",
        "Executing SQL queries involving aggregate functions (COUNT, SUM, AVG, MIN, MAX) and scalar functions.",
        "Implementation of Nested Subqueries, Correlated Subqueries, and Set Operations (UNION, INTERSECT, MINUS).",
        "Executing various Joins: Inner Join, Left Outer Join, Right Outer Join, Full Outer Join, Self Join.",
        "Creation and manipulation of Views, Indexes, and Sequences.",
        "PL/SQL Programming: Writing PL/SQL blocks with conditional statements, loops, and explicit cursors.",
        "Creating and executing stored procedures and functions with IN, OUT, IN OUT parameters.",
        "Creating Row-level and Statement-level Triggers for automated auditing and data validation."
      ]
    }
  },
  {
    code: "BCSI310",
    name: "Summer Project Seminar-I",
    subjectType: "SEMINAR",
    credits: 1.0,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 2,
    evaluationMarks: "CA: 10, EE: 15, Total: 25",
    syllabusDetails: {
      objectives: ["To evaluate summer training / industrial internship projects undertaken at the conclusion of Year I."],
      outcomes: ["Deliver a structured technical presentation and submit an engineering documentation report."],
      labExperiments: [
        "Submission of technical internship/training certificate and project report.",
        "Slide presentation summarizing software/hardware technologies utilized during the internship.",
        "Demonstration of working prototypes or modules developed.",
        "Viva-voce examination assessing technical problem-solving, project lifecycle knowledge, and individual contribution."
      ]
    }
  }
];

module.exports = { SEMESTER_3_SUBJECTS };

