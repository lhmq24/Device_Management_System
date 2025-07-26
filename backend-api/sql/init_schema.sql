--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-07-26 17:22:45

SET statement_timeout = 0;
SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 16405)
-- Name: project; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA project;


ALTER SCHEMA project OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 225 (class 1259 OID 16524)
-- Name: device; Type: TABLE; Schema: project; Owner: postgres
--

CREATE TABLE project.device (
    device_id integer NOT NULL,
    unit_id integer NOT NULL,
    device_name text NOT NULL,
    device_buy_date date NOT NULL,
    device_maintenance_interval integer NOT NULL,
    device_img text
);


ALTER TABLE project.device OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16523)
-- Name: device_device_id_seq; Type: SEQUENCE; Schema: project; Owner: postgres
--

ALTER TABLE project.device ALTER COLUMN device_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME project.device_device_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 16500)
-- Name: maintainer; Type: TABLE; Schema: project; Owner: postgres
--

CREATE TABLE project.maintainer (
    m_id integer NOT NULL,
    m_name text NOT NULL,
    m_phone text NOT NULL,
    m_email text NOT NULL
);


ALTER TABLE project.maintainer OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16499)
-- Name: maintainer_m_id_seq; Type: SEQUENCE; Schema: project; Owner: postgres
--

ALTER TABLE project.maintainer ALTER COLUMN m_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME project.maintainer_m_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 226 (class 1259 OID 16536)
-- Name: maintenance_report; Type: TABLE; Schema: project; Owner: postgres
--

CREATE TABLE project.maintenance_report (
    device_id integer NOT NULL,
    m_id integer NOT NULL,
    mr_date date NOT NULL,
    mr_note text
);


ALTER TABLE project.maintenance_report OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16516)
-- Name: unit; Type: TABLE; Schema: project; Owner: postgres
--

CREATE TABLE project.unit (
    unit_id integer NOT NULL,
    unit_name text NOT NULL,
    unit_location text NOT NULL
);


ALTER TABLE project.unit OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16515)
-- Name: unit_unit_id_seq; Type: SEQUENCE; Schema: project; Owner: postgres
--

ALTER TABLE project.unit ALTER COLUMN unit_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME project.unit_unit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 16390)
-- Name: contacts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contacts (
    id integer NOT NULL,
    name text NOT NULL,
    email text,
    address text,
    phone character varying(255),
    favorite boolean DEFAULT false NOT NULL,
    avatar text
);


ALTER TABLE public.contacts OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16389)
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contacts_id_seq OWNER TO postgres;

--
-- TOC entry 4889 (class 0 OID 0)
-- Dependencies: 218
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


--
-- TOC entry 4715 (class 2604 OID 16393)
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- TOC entry 4882 (class 0 OID 16524)
-- Dependencies: 225
-- Data for Name: device; Type: TABLE DATA; Schema: project; Owner: postgres
--

COPY project.device (device_id, unit_id, device_name, device_buy_date, device_maintenance_interval, device_img) FROM stdin;
2	50	Practical Plastic Tuna	2024-08-26	196	/public/images/blank-profile-picture.png
3	85	Frozen Silk Pants	2025-03-09	333	/public/images/blank-profile-picture.png
4	24	Refined Rubber Table	2024-11-28	173	/public/images/blank-profile-picture.png
5	29	Handmade Plastic Hat	2024-11-26	223	/public/images/blank-profile-picture.png
6	71	Awesome Bronze Chips	2025-05-02	164	/public/images/blank-profile-picture.png
7	58	Soft Marble Hat	2024-12-07	294	/public/images/blank-profile-picture.png
8	95	Practical Bamboo Shoes	2025-03-25	215	/public/images/blank-profile-picture.png
9	88	Oriental Marble Chair	2024-12-11	254	/public/images/blank-profile-picture.png
10	34	Recycled Steel Soap	2024-08-26	23	/public/images/blank-profile-picture.png
11	82	Elegant Concrete Sausages	2024-08-13	93	/public/images/blank-profile-picture.png
12	18	Small Granite Table	2025-02-13	109	/public/images/blank-profile-picture.png
13	74	Oriental Ceramic Pizza	2025-04-09	299	/public/images/blank-profile-picture.png
14	37	Fresh Gold Car	2024-11-18	38	/public/images/blank-profile-picture.png
15	79	Gorgeous Granite Fish	2024-11-09	106	/public/images/blank-profile-picture.png
16	31	Small Aluminum Bike	2025-02-01	97	/public/images/blank-profile-picture.png
17	15	Recycled Plastic Chicken	2024-12-06	277	/public/images/blank-profile-picture.png
18	34	Unbranded Wooden Pants	2024-07-27	213	/public/images/blank-profile-picture.png
19	22	Awesome Metal Chair	2025-04-12	180	/public/images/blank-profile-picture.png
20	36	Unbranded Metal Chicken	2025-03-31	10	/public/images/blank-profile-picture.png
21	67	Handmade Steel Chair	2025-02-26	216	/public/images/blank-profile-picture.png
22	19	Refined Cotton Chips	2025-03-08	144	/public/images/blank-profile-picture.png
23	94	Small Bronze Sausages	2025-05-06	107	/public/images/blank-profile-picture.png
24	97	Unbranded Metal Bacon	2024-12-05	198	/public/images/blank-profile-picture.png
25	75	Tasty Marble Hat	2025-05-20	261	/public/images/blank-profile-picture.png
26	67	Handmade Wooden Towels	2024-11-20	263	/public/images/blank-profile-picture.png
27	89	Elegant Marble Soap	2024-10-11	324	/public/images/blank-profile-picture.png
28	34	Incredible Wooden Pizza	2024-06-30	357	/public/images/blank-profile-picture.png
29	25	Handcrafted Rubber Cheese	2024-11-12	286	/public/images/blank-profile-picture.png
30	89	Fantastic Aluminum Hat	2025-01-02	166	/public/images/blank-profile-picture.png
31	89	Rustic Silk Chicken	2024-12-20	124	/public/images/blank-profile-picture.png
32	25	Awesome Bamboo Towels	2025-03-16	314	/public/images/blank-profile-picture.png
33	56	Soft Marble Towels	2025-06-08	263	/public/images/blank-profile-picture.png
34	33	Refined Silk Chips	2024-09-13	243	/public/images/blank-profile-picture.png
35	15	Rustic Bamboo Keyboard	2025-05-11	285	/public/images/blank-profile-picture.png
36	49	Handmade Metal Pants	2025-05-01	331	/public/images/blank-profile-picture.png
37	61	Generic Concrete Chips	2025-03-17	54	/public/images/blank-profile-picture.png
38	26	Rustic Metal Chair	2024-10-05	3	/public/images/blank-profile-picture.png
39	73	Intelligent Marble Gloves	2024-07-28	25	/public/images/blank-profile-picture.png
40	99	Incredible Silk Chicken	2024-12-13	312	/public/images/blank-profile-picture.png
41	44	Tasty Cotton Towels	2025-04-25	21	/public/images/blank-profile-picture.png
42	84	Rustic Wooden Sausages	2025-06-15	244	/public/images/blank-profile-picture.png
43	88	Electronic Wooden Keyboard	2024-08-10	194	/public/images/blank-profile-picture.png
44	95	Ergonomic Wooden Hat	2025-03-12	273	/public/images/blank-profile-picture.png
45	23	Electronic Ceramic Bike	2024-07-09	364	/public/images/blank-profile-picture.png
46	99	Generic Plastic Gloves	2025-05-25	54	/public/images/blank-profile-picture.png
47	100	Sleek Bamboo Car	2024-12-02	137	/public/images/blank-profile-picture.png
48	8	Frozen Bronze Chicken	2025-03-12	75	/public/images/blank-profile-picture.png
49	77	Generic Cotton Tuna	2025-03-11	336	/public/images/blank-profile-picture.png
50	11	Bespoke Bronze Shirt	2025-04-11	185	/public/images/blank-profile-picture.png
51	20	Rustic Rubber Pizza	2024-09-17	198	/public/images/blank-profile-picture.png
52	27	Handcrafted Wooden Ball	2024-10-27	178	/public/images/blank-profile-picture.png
53	61	Refined Wooden Keyboard	2024-10-15	156	/public/images/blank-profile-picture.png
54	68	Oriental Metal Ball	2025-06-08	216	/public/images/blank-profile-picture.png
55	82	Refined Metal Bacon	2024-11-25	151	/public/images/blank-profile-picture.png
56	58	Intelligent Steel Pizza	2024-10-03	131	/public/images/blank-profile-picture.png
57	59	Licensed Concrete Table	2024-11-21	81	/public/images/blank-profile-picture.png
58	46	Incredible Ceramic Shirt	2024-10-07	297	/public/images/blank-profile-picture.png
59	7	Elegant Wooden Soap	2025-03-08	84	/public/images/blank-profile-picture.png
60	81	Fantastic Steel Towels	2025-02-09	113	/public/images/blank-profile-picture.png
61	100	Generic Wooden Shirt	2025-02-04	171	/public/images/blank-profile-picture.png
62	67	Gorgeous Bamboo Chair	2025-05-18	211	/public/images/blank-profile-picture.png
63	20	Elegant Steel Car	2024-10-01	296	/public/images/blank-profile-picture.png
64	16	Handmade Marble Shoes	2024-06-24	171	/public/images/blank-profile-picture.png
65	90	Recycled Metal Table	2025-02-07	320	/public/images/blank-profile-picture.png
66	61	Elegant Granite Towels	2025-06-09	346	/public/images/blank-profile-picture.png
67	72	Awesome Bronze Shoes	2025-03-18	60	/public/images/blank-profile-picture.png
68	25	Refined Rubber Bike	2025-04-18	358	/public/images/blank-profile-picture.png
69	94	Incredible Granite Fish	2025-04-26	243	/public/images/blank-profile-picture.png
70	86	Elegant Granite Car	2025-03-06	7	/public/images/blank-profile-picture.png
71	3	Practical Gold Sausages	2024-08-29	195	/public/images/blank-profile-picture.png
72	6	Unbranded Rubber Tuna	2025-03-20	142	/public/images/blank-profile-picture.png
73	63	Oriental Silk Table	2025-05-29	112	/public/images/blank-profile-picture.png
74	17	Electronic Silk Ball	2024-10-29	32	/public/images/blank-profile-picture.png
75	23	Elegant Concrete Table	2024-06-26	323	/public/images/blank-profile-picture.png
76	41	Awesome Gold Shoes	2025-01-23	287	/public/images/blank-profile-picture.png
77	9	Ergonomic Concrete Shoes	2025-03-09	34	/public/images/blank-profile-picture.png
78	54	Modern Concrete Computer	2024-07-08	175	/public/images/blank-profile-picture.png
79	30	Incredible Wooden Tuna	2025-02-18	84	/public/images/blank-profile-picture.png
80	79	Frozen Silk Chicken	2024-12-28	255	/public/images/blank-profile-picture.png
81	97	Incredible Granite Chicken	2024-09-13	179	/public/images/blank-profile-picture.png
82	37	Sleek Ceramic Ball	2025-02-08	143	/public/images/blank-profile-picture.png
83	28	Electronic Plastic Computer	2024-06-20	3	/public/images/blank-profile-picture.png
84	88	Recycled Gold Chips	2024-09-05	184	/public/images/blank-profile-picture.png
85	81	Small Concrete Towels	2024-10-04	357	/public/images/blank-profile-picture.png
86	36	Rustic Rubber Table	2025-02-28	12	/public/images/blank-profile-picture.png
87	11	Fresh Granite Mouse	2024-11-03	16	/public/images/blank-profile-picture.png
88	10	Fantastic Bamboo Salad	2025-02-04	326	/public/images/blank-profile-picture.png
89	76	Rustic Steel Towels	2024-09-19	115	/public/images/blank-profile-picture.png
90	82	Generic Rubber Chair	2024-12-15	365	/public/images/blank-profile-picture.png
91	83	Oriental Ceramic Towels	2024-08-28	287	/public/images/blank-profile-picture.png
92	87	Intelligent Aluminum Computer	2024-06-20	27	/public/images/blank-profile-picture.png
93	8	Awesome Ceramic Car	2025-05-09	93	/public/images/blank-profile-picture.png
94	19	Generic Gold Chips	2024-11-14	14	/public/images/blank-profile-picture.png
95	39	Ergonomic Metal Car	2025-03-07	324	/public/images/blank-profile-picture.png
96	21	Licensed Cotton Shoes	2024-12-21	327	/public/images/blank-profile-picture.png
97	85	Elegant Silk Mouse	2025-04-01	220	/public/images/blank-profile-picture.png
98	2	Oriental Plastic Chair	2025-06-02	249	/public/images/blank-profile-picture.png
99	69	Elegant Plastic Pants	2024-09-25	92	/public/images/blank-profile-picture.png
100	97	Small Silk Cheese	2024-08-20	221	/public/images/blank-profile-picture.png
107	100	Device Name	2023-01-01	30	/public/uploads/1750401150567-570105971.jpg
113	41	ggfffg	2025-07-18	120	../../public/images/blank-profile-picture.png
135	104	add	2025-07-04	30	/public/images/blank-profile-picture.png
\.


--
-- TOC entry 4878 (class 0 OID 16500)
-- Dependencies: 221
-- Data for Name: maintainer; Type: TABLE DATA; Schema: project; Owner: postgres
--

COPY project.maintainer (m_id, m_name, m_phone, m_email) FROM stdin;
2	Alison Koch	764.821.1744 x8189	Madilyn.Monahan64@gmail.com
4	Jeffery Gleichner	(617) 726-7599 x6747	Laverne.Effertz93@gmail.com
5	Travis Ritchie	300-669-1321	Dimitri.Lockman63@gmail.com
6	Blanca Aufderhar	766.821.2589 x939	Monica.Mertz@gmail.com
7	Adrienne Satterfield	(944) 219-4912 x618	Gust_MacGyver@hotmail.com
8	April Cummerata V	659.952.2608	Rusty.Nienow35@yahoo.com
9	Margie Baumbach IV	759-720-2867	Jordane_Cummings@gmail.com
10	Arturo Pfeffer	283.573.6150 x4645	Bianka_Kreiger@yahoo.com
11	Angel Cruickshank	562.827.4673 x85651	Walton_Reilly68@yahoo.com
12	Travis Bergnaum	(231) 507-9029 x34868	Cade.Hermiston@gmail.com
13	Corey Bins	696.349.6273 x2650	Eino_Kris@hotmail.com
14	Misty Schoen	923.436.3761 x085	Emmy_Schroeder23@yahoo.com
15	Mrs. Bonnie Lang	(706) 660-5985 x72291	Darion.Lakin17@hotmail.com
16	Tamara King	322.906.0241 x186	Lauriane_Smith30@hotmail.com
17	Silvia Hyatt	(241) 772-3259 x44113	Everette_McCullough@gmail.com
18	Corey Schulist	(209) 780-1281 x0976	Riley_Ebert8@yahoo.com
19	Dixie Balistreri	831.714.4599	Rowena.Dickinson97@gmail.com
20	Leticia Wiegand	935.504.7540 x088	Giovanni_Rowe-Christiansen79@hotmail.com
21	Dr. Saul Parisian	(481) 391-1041 x2903	Luella_Nikolaus64@gmail.com
22	Dana Thompson	(602) 444-2422 x216	David_Stiedemann@hotmail.com
23	Conrad Parisian	1-461-627-0203 x4065	Bryon.Kovacek@yahoo.com
24	Woodrow Kuhlman	1-909-212-0145 x667	Eula.Schultz@hotmail.com
25	Tricia Stiedemann	882.300.1314 x06037	Destini_Denesik87@gmail.com
26	Rufus Lakin III	(394) 771-8761	Braulio_Wiza83@hotmail.com
27	Lois Stanton	(563) 502-3113 x935	Rahsaan.Daniel39@yahoo.com
28	Bert Nicolas	1-729-389-1392 x30999	Amie.Sawayn@hotmail.com
29	Jeremiah Welch	(447) 524-2793	Mack.Glover@gmail.com
30	Dr. Wm Bins III	523-764-8782	Yolanda.Harris@hotmail.com
31	Luz Hudson	634-752-7641	Alisha.Hermann@gmail.com
32	Gayle Crona II	550-495-8059 x06884	Gene.Conn2@yahoo.com
33	Leslie Nader	1-249-715-2134 x456	Chauncey.Kub44@hotmail.com
34	Dr. Terrence Paucek	840-447-4016 x72709	Katrina.Sawayn38@yahoo.com
35	Earl Breitenberg	541-261-9095 x830	Flo_Purdy@gmail.com
36	Earnest Breitenberg	(378) 360-4936 x35406	Alexandrea.Halvorson94@hotmail.com
37	Catherine Hansen	329.215.3446 x236	Linwood_Bailey@hotmail.com
38	Matt Hahn	1-831-283-7599 x854	Aimee_Hane@hotmail.com
39	Alberta Emmerich	(309) 708-8988 x17772	Leda.Swaniawski@gmail.com
40	Boyd Koepp	268-704-6572 x89021	Raina_Ferry@hotmail.com
41	Bennie DuBuque	596-492-5570 x672	Marco.Schmeler73@hotmail.com
42	Marilyn Wyman-Reilly	235-992-0101 x70679	Rowland.Ullrich25@yahoo.com
43	Lucas Reichert	376.320.0218 x4251	Anne_Homenick3@gmail.com
44	Francis Kiehn	1-772-203-1961 x964	Micah_Doyle38@hotmail.com
45	Mr. Mathew Mayert	(200) 752-3707 x3133	Alanis.Osinski@gmail.com
46	Marcus Fahey	(620) 903-1263	Skyla.Terry30@yahoo.com
47	Kirk Cronin	(745) 816-3032	Maurice.Ferry@yahoo.com
48	Mr. Nick Leuschke	1-632-980-6121 x56648	Eino_McGlynn30@hotmail.com
49	Steve Wilkinson	1-672-597-5029 x5949	Kaleb.Bechtelar@yahoo.com
50	Josefina Bernhard	(381) 388-0536 x8043	Joe.Gutmann@hotmail.com
52	Maintainer Name	1234567890	maintainer@email.com
54	Maintainer Name	1234567890	maintainer@email.com
56	Maintainer Name	1234567890	maintainer@email.com
58	Maintainer Name	1234567890	maintainer@email.com
60	Maintainer Name	1234567890	maintainer@email.com
1	Maintainer Name	1234567890	maintainer@email.com
3	Maintainer Name	1234567890	maintainer@email.com
53	Maintainer Name	1234567890	maintainer@email.com
55	Maintainer Name	1234567890	maintainer@email.com
57	Maintainer Name	1234567890	maintainer@email.com
59	Maintainer Name	1234567890	maintainer@email.com
61	Maintainer Name	1234567890	maintainer@email.com
\.


--
-- TOC entry 4883 (class 0 OID 16536)
-- Dependencies: 226
-- Data for Name: maintenance_report; Type: TABLE DATA; Schema: project; Owner: postgres
--

COPY project.maintenance_report (device_id, m_id, mr_date, mr_note) FROM stdin;
28	40	2024-07-31	Sono umbra teres tempora totus casso annus carpo.
67	16	2024-11-17	Iure caritas coniuratio ascit tandem denique vomica volva.
92	11	2024-07-04	Cribro alter aperio deputo dedecor tamdiu abbas viriliter.
3	17	2025-04-06	Saepe claro aureus spargo adulescens considero defetiscor stabilis theatrum ut.
96	44	2025-05-23	\N
51	34	2024-10-13	Pecus vae calamitas cauda stella.
70	49	2024-08-15	Valde caste comptus aestas coma adinventitias patria cilicium.
61	41	2024-09-24	Consectetur verbera comes.
80	46	2025-05-15	Delibero aliquid copiose vallum tolero.
50	33	2025-04-21	\N
88	50	2024-12-15	Adstringo voluntarius urbanus non suasoria ciminatio varius ulterius cura appello.
16	1	2024-08-27	Advoco cuius cubo arx deorsum sapiente alii dolore via.
25	22	2024-07-24	Civitas amplitudo uterque adfectus suadeo substantia contego damno pecto aliqua.
21	32	2025-05-08	Harum atque nam tabgo conspergo suppellex adhuc.
37	16	2025-01-02	Perferendis centum stella defero comedo comedo via tendo damnatio suspendo.
63	45	2024-11-04	Cras asporto suffoco utroque.
6	40	2025-06-02	Torqueo ipsam vinculum ante voluptates denuo audentia.
59	33	2024-09-05	\N
33	22	2024-07-16	\N
65	8	2025-01-25	Iste aeger nulla.
45	45	2025-02-23	Tot vesica impedit defessus corroboro curtus tempora.
41	19	2025-06-02	Arca vallum adeo verbera doloribus canonicus capto abutor alias.
98	29	2024-08-30	Teres victoria calco cohibeo crustulum armarium condico degero excepturi spoliatio.
95	29	2024-12-20	\N
44	40	2024-09-30	Vesper tyrannus terreo sit aer corpus damno maiores rem.
51	29	2024-07-31	Atavus animadverto ver voluptate amplus vox harum defleo vereor terreo.
72	50	2024-10-08	Contabesco carcer creo soluta ait demitto centum distinctio vilitas.
64	34	2025-03-01	\N
44	29	2025-01-17	Vergo auxilium adamo.
33	10	2025-03-24	\N
96	39	2025-03-30	Somnus cursim verus paens maiores.
11	41	2025-04-10	\N
40	20	2024-09-08	Vulnus suggero utpote ubi comminor temperantia.
48	3	2024-09-19	Abbas deficio amiculum appono audentia trepide saepe.
81	38	2024-06-28	Angelus alienus succurro una asporto conventus totus adstringo crinis.
95	29	2024-07-31	Vesper avaritia dedico candidus.
27	31	2025-01-04	Casso officia volutabrum.
32	22	2024-09-15	Vulnero tutis caritas artificiose villa audeo ascisco vado sortitus.
86	49	2024-09-18	Aeneus sollers utpote accusantium trucido cui sursum.
76	6	2025-01-26	Ocer compello cresco.
71	11	2025-01-28	Absens denique suscipio aufero.
26	42	2024-09-17	Canto esse cupiditas acervus tertius cunae aestivus vere casso vito.
39	49	2024-07-17	Consequuntur capillus tum odio.
24	1	2025-02-17	Ascisco demo virgo impedit cribro ademptio inflammatio.
77	32	2024-08-19	Aegrotatio adsidue terra.
48	41	2025-06-03	Absconditus laboriosam amissio tepidus.
52	9	2024-10-29	\N
48	35	2024-07-05	Illo subnecto tergiversatio ver eum surgo clibanus defendo adficio tumultus.
20	46	2024-12-21	Urbanus angelus sol.
5	4	2024-12-11	Voro validus celer.
34	35	2025-02-19	Sum verto correptius tenus tum thermae abstergo audentia vociferor.
22	15	2025-04-24	Cresco cetera venio catena.
42	37	2024-12-09	Terminatio trepide degenero assentator cibus.
5	36	2025-03-10	Vere similique caste.
10	30	2025-05-20	\N
48	26	2025-04-11	\N
95	25	2025-03-17	Abduco armarium depereo ducimus nobis vesco tremo stipes.
100	14	2025-01-29	\N
37	26	2024-08-31	\N
4	32	2024-06-28	Commodi omnis pauci.
30	11	2025-04-13	Ante verecundia bis atqui verbum voluptatibus vitium ulciscor absorbeo.
98	48	2024-11-17	\N
82	38	2025-05-25	Debilito conventus vicissitudo.
68	40	2025-03-01	Accusator degero ventus terreo tabella vulnero cruentus trans corroboro.
23	14	2025-02-25	Despecto defetiscor crux curto repellendus caute tertius occaecati aperiam vita.
90	18	2025-03-01	Dolor laboriosam expedita nisi substantia vulgivagus autus.
71	27	2024-12-23	Odit vilitas porro amplexus ipsa aequitas casus quis curriculum.
65	9	2024-08-19	\N
25	1	2024-06-27	Ager molestias vilis decet altus varietas vulnus quis deprimo.
84	45	2024-08-01	Suscipit debitis reprehenderit.
45	1	2025-01-19	Bibo eius vulgaris suffragium brevis circumvenio cilicium.
76	30	2025-03-12	\N
15	35	2024-07-04	Acer conitor commemoro abeo deduco atrox acer cohors ad.
9	10	2025-02-07	Commodo pecco perspiciatis tendo vilis tripudio sufficio adeo tonsor aeger.
92	3	2025-06-05	Desipio denique caelum patior beneficium aliqua dolore cui vita.
39	21	2024-08-27	Incidunt deputo artificiose suus volutabrum.
92	42	2024-10-24	Distinctio corrumpo infit deleo tumultus depereo.
72	20	2025-05-14	Cicuta aedificium adopto desparatus solutio theatrum barba tui quisquam.
55	14	2024-09-08	Adduco desipio sperno quis solum amitto constans adulescens.
5	42	2024-08-20	A undique vomito subito decretum thorax.
87	6	2025-03-27	Alius tergiversatio tempore quam acer tardus.
84	19	2024-11-04	Infit canto terreo tego creptio trepide.
86	34	2024-12-26	\N
26	48	2024-10-11	Casso deporto adnuo error.
48	3	2024-12-21	\N
40	15	2025-02-12	Baiulus admoveo cimentarius textus vinculum.
81	2	2025-05-13	Pecto acsi timor turba volva tolero in thema.
77	4	2024-12-06	Sto adipisci carcer argentum depromo supellex tergum pax iusto.
76	27	2025-06-01	Explicabo maxime debilito animus cupressus synagoga.
24	34	2025-04-09	Cilicium corrigo decet caelestis quas catena commodo.
37	13	2024-12-29	\N
61	45	2025-01-31	Accendo creta vilis.
89	33	2024-08-06	Cibo adhaero videlicet decor voro absconditus cuppedia avaritia.
89	21	2025-01-12	Adsuesco sordeo celer ex.
9	19	2024-10-16	Unus ea blandior reprehenderit custodia concido defendo arma auctor.
19	47	2024-09-03	Cunae veritas certe curtus convoco perspiciatis denego inventore animi.
52	6	2025-04-29	Cibus adsuesco utor testimonium utrum officia mollitia.
45	43	2024-07-04	Vesica crur caelum enim tonsor censura tristis delibero culpo.
92	7	2025-03-21	Acquiro spectaculum demitto dolorem admiratio cognatus.
66	47	2024-11-05	Assumenda uterque canonicus tondeo nulla cupressus cohaero cursus cubicularis quibusdam.
42	39	2024-09-10	Aufero cupio ter urbs.
35	49	2025-05-17	\N
48	4	2024-12-09	Combibo aduro abscido theca compello colligo admitto illum.
36	32	2025-03-07	Centum capillus auctus demoror coniecto uredo tergeo.
40	15	2025-03-11	Vilis vicinus spectaculum ter argentum.
71	30	2025-05-18	Pecco viscus est calculus delicate totidem demergo tempore chirographum apto.
82	7	2025-02-21	\N
24	8	2025-04-24	Caries casso ante vetus solvo vomica censura.
17	15	2024-07-01	\N
71	45	2024-10-12	Sopor subnecto avaritia.
8	15	2025-05-29	Sursum aetas magnam summopere viscus arbitro utilis tres deserunt.
47	47	2024-11-29	Vinco tamen urbanus earum.
30	42	2025-01-08	\N
89	16	2024-12-17	Supplanto spargo subito ustulo aestivus pel stabilis conatus adduco.
49	18	2024-10-19	Adipiscor aranea currus blandior urbs excepturi.
39	23	2025-04-01	Aegrotatio decipio delinquo.
34	48	2024-11-02	\N
85	8	2024-12-26	Ulterius eligendi ventito creo turpis adsum surculus cogo.
71	44	2025-02-26	Ver teneo aptus cubo tunc illum anser cohibeo currus.
18	23	2024-07-20	Viriliter volup certus communis caritas corroboro crudelis tutis tum.
71	40	2024-07-08	Aequus adflicto depereo theca cui temptatio.
95	11	2025-04-06	\N
80	45	2025-03-24	Beatae perspiciatis conscendo.
42	30	2024-09-02	Texo decet verumtamen dolores compello causa civitas stips.
35	16	2024-07-03	Taedium tremo varius conscendo adimpleo confugo adflicto cibus.
5	45	2025-01-31	Acervus viridis conservo alter crur velum usque corrigo expedita.
33	14	2025-03-26	Strues repudiandae aranea collum cornu animus depereo crapula quia.
62	2	2024-07-24	\N
16	18	2024-08-12	Vilicus tergeo demo ars advoco aperio basium deinde.
71	7	2025-03-06	Custodia tego aeger crudelis conservo crapula uberrime delinquo vado aestivus.
99	29	2024-12-07	Molestiae solio adipiscor curvo adficio artificiose desino urbanus optio ars.
96	19	2024-11-22	Utrimque veritatis textus advenio.
5	14	2024-11-10	Aliquam argumentum canto.
24	13	2024-11-19	Corrupti thesaurus absorbeo beneficium ipsum cornu synagoga somnus tripudio.
51	27	2024-10-23	Suggero ascisco termes trado vobis balbus virga curatio ait.
23	22	2025-02-16	Dolores ambitus sequi.
35	28	2024-07-04	Strenuus contabesco tyrannus arguo repellat cinis delectus.
20	24	2024-11-04	Succedo patrocinor celo subiungo culpo admiratio denuo cultura cupio cogo.
83	45	2024-07-02	Cubicularis theologus tergum aeternus.
26	7	2024-07-15	\N
30	34	2025-04-24	Defendo volup sopor patrocinor tametsi audentia.
58	27	2025-05-16	Ultra sui curvo a.
31	19	2025-04-08	Terreo earum angulus blandior cursim cibus cruentus.
66	37	2024-06-22	\N
82	21	2025-02-17	Adeo aptus recusandae clamo sed vindico.
56	12	2024-12-26	\N
49	31	2025-05-04	Cum accusantium velociter administratio turbo.
25	39	2025-03-16	Defaeco fugiat voluptatibus pauci conservo via.
91	17	2024-06-27	Doloribus coruscus subiungo optio tumultus distinctio vulgivagus.
67	13	2025-02-27	Universe deporto repudiandae correptius truculenter bis facere.
49	22	2024-08-14	Conicio est iste.
8	5	2025-03-31	\N
21	25	2024-10-13	Caelestis centum peccatus vox confido.
68	20	2024-09-07	Sperno curto annus ago vergo.
35	45	2024-09-18	\N
44	7	2024-07-07	Cognatus convoco terreo combibo ambulo ustulo sono.
75	17	2025-01-12	\N
88	49	2025-01-13	Tabgo sol caveo pel vehemens tenuis.
40	43	2024-09-13	Totidem appello tener acervus curo charisma toties.
42	31	2025-02-12	Vinco copia terra textilis bellicus eius dolores labore occaecati deduco.
26	34	2024-09-14	Non consectetur videlicet maxime soluta decet porro repellat.
57	36	2025-05-12	Placeat voluptatibus corpus.
48	35	2024-06-23	Sponte animi celer villa paulatim.
74	19	2024-11-03	Territo acies aut utrimque benevolentia sui delinquo crux celebrer.
40	6	2024-12-10	\N
45	14	2024-08-04	Pax consequuntur censura arbustum solio a votum terminatio nisi ullus.
69	3	2024-11-20	Atrox tener amoveo coniuratio subseco adimpleo.
78	5	2025-03-22	Vulariter accedo comburo decor subnecto decerno video.
89	18	2024-07-27	Infit conor quidem desparatus infit degenero callide somniculosus clam suasoria.
53	30	2024-10-08	Pecus infit aliquid canonicus sumptus celebrer cito coniecto cupiditate amita.
43	33	2024-11-06	\N
85	26	2024-08-18	Pecco cupio beatus credo turpis tremo.
79	4	2025-04-17	\N
91	29	2025-01-01	Clamo timor solutio vita currus audeo.
80	39	2024-11-05	Catena cado bos conatus comprehendo angustus vita eos.
16	22	2025-04-14	Tergeo degusto speciosus fugit veritas alter coniuratio sumo communis vilicus.
76	47	2024-11-22	Quam correptius audacia vilitas vergo amet curatio adfectus urbanus angustus.
29	28	2024-10-21	Vilicus clamo curvo blanditiis aptus aspernatur clarus comprehendo cubo consequuntur.
63	35	2024-08-02	\N
51	24	2025-04-20	\N
66	40	2024-11-18	Angulus trepide ater tepidus.
23	39	2025-01-14	Maiores tubineus adinventitias tam truculenter argumentum sit defendo vinitor deleniti.
8	9	2024-10-30	Defleo cupiditas dens torqueo.
41	2	2025-01-20	Amplexus nesciunt clam.
27	38	2025-02-13	Terra sordeo sol tripudio alveus.
20	8	2024-08-07	Saepe solium audacia sapiente sordeo vero stultus apto delectatio.
99	43	2025-03-02	Dolorum avaritia denuo cur nam apud.
8	16	2025-03-14	Terga a cornu.
14	24	2024-07-10	Vado complectus sustineo ustulo laborum.
49	8	2025-04-13	Aegrus nemo volubilis cavus admoneo accusantium delibero totus caries.
54	43	2025-04-21	Cedo calculus patior suggero.
8	25	2024-08-06	\N
71	3	2025-04-26	Spoliatio vobis apud tutamen repudiandae.
\.


--
-- TOC entry 4880 (class 0 OID 16516)
-- Dependencies: 223
-- Data for Name: unit; Type: TABLE DATA; Schema: project; Owner: postgres
--

COPY project.unit (unit_id, unit_name, unit_location) FROM stdin;
2	Windler Inc Unit	8961 Bayer Skyway Suite 941
3	Heaney Inc Unit	990 Kunze Motorway Apt. 904
4	Purdy Inc Unit	9058 Hill Road Suite 362
5	Lesch - Feest Unit	81358 Schiller Coves Suite 568
6	Greenholt - Corwin Unit	203 Frida Villages Suite 309
7	Hagenes Group Unit	68262 Homenick Well Apt. 165
8	Haley and Sons Unit	8069 Mann Brook Suite 105
9	Kunde Inc Unit	157 E State Street Suite 778
10	Deckow and Sons Unit	7944 Feeney Mountains Suite 213
11	Kunze - Considine Unit	24223 Schultz Crest Suite 771
12	Wilkinson - Collier Unit	60463 Jaleel Pike Apt. 622
13	Feest - Spencer Unit	33573 Laurel Close Apt. 927
14	Hayes Inc Unit	869 Barrows Way Suite 746
15	Wehner LLC Unit	2847 Cormier Lane Suite 693
16	Kling and Sons Unit	609 Madison Walks Apt. 343
17	Wuckert Inc Unit	9388 O'Kon Groves Suite 870
18	Powlowski LLC Unit	244 Julie Manors Apt. 956
19	Ebert, Ledner and Thompson Unit	20461 Raynor Motorway Apt. 836
20	Gibson Inc Unit	46654 Dante Junction Apt. 908
21	Hammes - Bogisich Unit	8363 Beryl Manor Apt. 369
22	Frami, Bergstrom and Frami Unit	24947 Bednar Park Apt. 232
23	Hand, Senger and Buckridge Unit	1852 E 9th Street Suite 370
24	Quigley and Sons Unit	145 Strosin Shoal Suite 607
25	Bailey - Hegmann Unit	760 Tod Path Suite 628
26	Connelly, Kunze and Bins Unit	891 W Washington Street Suite 863
27	Bartoletti LLC Unit	5093 Jefferson Street Suite 778
28	Johnston - Sawayn Unit	950 N Poplar Street Apt. 708
29	Abernathy Inc Unit	67761 Hackett Glens Suite 697
30	Volkman, Roob and Conroy Unit	312 W 1st Street Apt. 720
31	Corwin - Kemmer Unit	3061 Pamela Brook Apt. 709
32	Hermiston LLC Unit	2659 Destiny Burg Suite 430
33	Koelpin, D'Amore and Sipes Unit	93277 Vena Overpass Suite 587
34	Batz - O'Kon Unit	386 Douglas Neck Apt. 935
35	Shields, Cassin and Cole Unit	233 Victoria Place Apt. 456
36	Walter - Hauck Unit	346 Westfield Road Suite 279
37	Borer - Runolfsson Unit	408 Castle Road Suite 510
38	Cronin, Kerluke and Borer Unit	6734 Rosella Cliffs Suite 516
39	Hermiston, Boehm and Reynolds Unit	3073 E Walnut Street Suite 698
40	Zboncak - Hammes Unit	937 Lawson Land Apt. 686
41	Bednar - Hagenes Unit	13290 Lawrence Street Suite 397
42	Gulgowski - Nolan Unit	26491 Jacques Groves Suite 985
43	Herzog, Smitham and Ebert Unit	4144 Lake Avenue Apt. 681
44	Medhurst, Quitzon and Gerlach Unit	3311 N East Street Apt. 907
45	Halvorson - Robel Unit	3276 Daniel Hills Apt. 558
46	Rau and Sons Unit	412 Paige Plain Suite 333
47	Pouros, Roob and Hills Unit	72477 Mohammad Bridge Apt. 858
48	Mayer, Mayert and Schuppe Unit	75046 Beech Drive Apt. 736
49	Kutch - Labadie Unit	25664 Angelina Expressway Apt. 268
50	Pfannerstill, Purdy and Nolan Unit	1216 Melyna Bridge Apt. 711
51	Erdman, Hermann and Spinka Unit	9835 Mill Road Suite 162
53	Conn - Padberg Unit	74545 Norbert Vista Suite 317
54	Lemke - Lebsack Unit	4347 Pfeffer Underpass Suite 880
55	Zemlak - Roob Unit	910 Keebler Radial Suite 307
56	Watsica, Mitchell and O'Reilly Unit	925 Runte Villages Apt. 858
57	Hettinger - Wunsch Unit	63401 Krajcik Causeway Suite 655
58	Runolfsson and Sons Unit	281 W Jefferson Street Apt. 369
59	Vandervort Group Unit	654 Poplar Close Suite 931
60	Maggio, Bogisich and Kling Unit	4934 Okuneva Street Suite 489
61	Emard - Bailey Unit	55880 Rodriguez Keys Apt. 374
63	Bogisich LLC Unit	28271 Briana Flat Apt. 843
64	Altenwerth - Mante Unit	29850 Hessel Camp Apt. 603
65	Labadie Inc Unit	445 Koby Crossing Apt. 510
66	Hermann, Stanton and Conroy Unit	5214 W River Road Suite 411
67	Braun - Robel Unit	36410 Loma Dale Suite 348
68	Roberts, Hansen and Beier Unit	680 Collier Summit Apt. 166
69	Wuckert - Daugherty Unit	81088 Chaya Stream Suite 305
70	Harber - O'Connell Unit	1265 10th Street Suite 476
71	Stracke LLC Unit	810 Swift Drives Suite 266
72	Klocko Inc Unit	180 Walnut Close Apt. 933
73	Raynor - VonRueden Unit	6038 Weimann Islands Apt. 484
74	Metz, Rogahn and Klocko Unit	351 Ash Street Suite 804
75	Predovic - Moen Unit	5332 Vandervort Viaduct Apt. 134
76	Ziemann - Lindgren Unit	572 Casimer Mews Apt. 464
77	Purdy Group Unit	8132 Howe Overpass Apt. 159
78	Runte, Nienow and Schroeder Unit	488 Mallie Ranch Apt. 158
79	Hane Group Unit	934 Charlie Trace Suite 808
80	Schoen LLC Unit	75842 N Poplar Street Apt. 438
81	Heaney - Kiehn Unit	65287 Stoney Lane Suite 554
82	Botsford Inc Unit	40549 N 6th Street Suite 403
83	Glover, Berge and McKenzie Unit	359 Duncan Lodge Suite 264
84	Dickens Group Unit	712 Vincenza Crossroad Suite 225
85	Toy - Trantow Unit	1080 S Washington Street Suite 774
86	Ratke and Sons Unit	55806 Rosenbaum Well Suite 858
87	Corkery Group Unit	56416 W Broadway Suite 890
88	Schowalter - Kihn Unit	14175 Beech Drive Apt. 824
89	Hansen - Marvin Unit	4020 Hal Gateway Apt. 401
90	Cartwright - Kohler Unit	1351 Nienow Course Suite 245
91	Murazik, Durgan and Stark Unit	3505 Runte Well Suite 146
92	Wisozk, Mante and Walker Unit	6231 Rolfson Square Suite 394
93	Auer, Balistreri and Quigley Unit	52509 Cordie Hills Apt. 503
94	Lindgren, Emard and Effertz Unit	651 Edna Corner Apt. 959
95	Jaskolski and Sons Unit	65607 Cleveland Street Apt. 251
96	Lind - Hahn Unit	6696 Rau Island Apt. 476
97	Collins, Hermann and Parker Unit	88687 Homenick Pike Suite 335
98	Kertzmann and Sons Unit	11903 Main Suite 816
99	Brekke LLC Unit	15868 Stokes Courts Suite 716
100	Sauer, Purdy and Leannon Unit	9212 Bertrand Centers Suite 279
101	New Unit Name	New Unit Location
103	New Unit Name	New Unit Location
104	New Unit Name	New Unit Location
105	New Unit Name	New Unit Location
106	New Unit Name	New Unit Location
107	New Unit Name	New Unit Location
108	New Unit Name	New Unit Location
110	New Unit Name	New Unit Location
111	New Unit Name	New Unit Location
1	New Unit Name	New Unit Location
\.


--
-- TOC entry 4876 (class 0 OID 16390)
-- Dependencies: 219
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contacts (id, name, email, address, phone, favorite, avatar) FROM stdin;
201	George Streich III	Graciela.Ebert@hotmail.com	247 Frances Fort	0995533669	t	/public/images/blank-profile-picture.png
204	Mamie Schuster Jr.	Vanessa_Baumbach@yahoo.com	28852 Hahn Mall	0980920424	f	/public/images/blank-profile-picture.png
205	Joann Windler	Walter.Grant4@gmail.com	9167 Legros Ferry	0908643155	t	/public/images/blank-profile-picture.png
206	Dr. Eugene Thiel Sr.	Gardner.Williamson47@gmail.com	93367 Nora Course	0942956226	t	/public/images/blank-profile-picture.png
207	Shannon Howell Jr.	Juliet.Franecki@hotmail.com	40425 Ondricka Parkway	0958986555	t	/public/images/blank-profile-picture.png
208	Sylvia Wiegand-Romaguera Sr.	Karelle73@gmail.com	260 Chestnut Close	0930392336	f	/public/images/blank-profile-picture.png
209	Ronnie Kovacek	June_Huels-Osinski@yahoo.com	5623 Manor Gardens	0982944664	t	/public/images/blank-profile-picture.png
211	Krystal Satterfield	Britney_Kulas@gmail.com	8640 Grace Loaf	0929909230	t	/public/images/blank-profile-picture.png
212	Clara Kshlerin	Judy80@gmail.com	48574 E 5th Street	0994876464	f	/public/images/blank-profile-picture.png
213	David Funk	Raina.Littel@gmail.com	759 Gladstone Road	0974799401	f	/public/images/blank-profile-picture.png
214	Adrian Fahey	Clara41@gmail.com	6876 Russel Pike	0903690484	t	/public/images/blank-profile-picture.png
215	Meghan Goldner	Kaleb48@yahoo.com	4116 Rodriguez River	0958462353	t	/public/images/blank-profile-picture.png
216	Sheila Grant	Jakayla_Casper42@gmail.com	35316 Alayna Village	0946059009	t	/public/images/blank-profile-picture.png
217	Antonia Towne	Anna_Hessel87@hotmail.com	829 Ferry Cove	0991782764	f	/public/images/blank-profile-picture.png
218	Alfred Mitchell Jr.	Terrill_Krajcik@yahoo.com	455 Vergie Views	0962438389	t	/public/images/blank-profile-picture.png
219	Myron Block	Sage.DAmore@hotmail.com	77588 N 7th Street	0955842911	f	/public/images/blank-profile-picture.png
220	Myron Murphy	Elvera53@hotmail.com	186 The Copse	0951186633	f	/public/images/blank-profile-picture.png
221	Sheryl Ziemann	Erna_Lind@hotmail.com	409 Willow Drive	0964369821	t	/public/images/blank-profile-picture.png
222	Susie Gottlieb	Isobel.Runolfsdottir@yahoo.com	34028 Iva Row	0931476298	t	/public/images/blank-profile-picture.png
223	Stephanie Pacocha	Maritza45@gmail.com	2451 Zieme Square	0935947767	f	/public/images/blank-profile-picture.png
224	Ella Brakus	Eulah82@hotmail.com	508 Jacklyn Squares	0987335456	f	/public/images/blank-profile-picture.png
225	Trevor Cronin DDS	Jacynthe_Oberbrunner@hotmail.com	3703 South Road	0922026582	f	/public/images/blank-profile-picture.png
226	Cecil Braun	Grover_Windler@yahoo.com	144 Bergstrom Burg	0978341410	t	/public/images/blank-profile-picture.png
227	Tasha Crooks	Jovany.Herman23@gmail.com	517 S Pine Street	0970018745	t	/public/images/blank-profile-picture.png
228	Dr. Johnny Ebert-Corkery	Brock.DuBuque34@hotmail.com	3053 N Main	0996671318	f	/public/images/blank-profile-picture.png
229	Mr. Luke Goldner	Odell_Kling4@yahoo.com	111 Smith Street	0978590106	f	/public/images/blank-profile-picture.png
230	Lynne Haley	Lew_McLaughlin17@gmail.com	870 Luz Fork	0960000240	f	/public/images/blank-profile-picture.png
231	Dorothy Dare	Verda.Walsh95@hotmail.com	8731 Nyasia Garden	0972349626	t	/public/images/blank-profile-picture.png
232	Jamie Boyer	Lela35@gmail.com	31791 Reichert Ridges	0903231593	t	/public/images/blank-profile-picture.png
233	Evelyn Huels DVM	Maverick_Pfannerstill@yahoo.com	8403 Brown Passage	0906081671	t	/public/images/blank-profile-picture.png
234	Miss Meredith Rau	Camille_Walter@yahoo.com	9586 Sandy Lane	0907802628	t	/public/images/blank-profile-picture.png
235	Philip Lindgren	Michael28@hotmail.com	32069 Buckingham Road	0976182827	f	/public/images/blank-profile-picture.png
236	Christine Jakubowski	Billy_Sauer54@gmail.com	3764 Barney Alley	0912813101	t	/public/images/blank-profile-picture.png
237	Dawn Green	Efrain44@yahoo.com	735 Zelma Bridge	0904045037	f	/public/images/blank-profile-picture.png
238	Lance Gottlieb	Mitchel.Heidenreich@gmail.com	62387 Gordon Street	0914553792	t	/public/images/blank-profile-picture.png
239	Katie Swift Jr.	Paige.Schmitt72@yahoo.com	761 Ashly Falls	0924638297	t	/public/images/blank-profile-picture.png
240	Stewart Connelly	Rasheed_Hudson@yahoo.com	3762 Ernser River	0950550595	f	/public/images/blank-profile-picture.png
241	Felipe Medhurst	Zachery.Medhurst@gmail.com	60638 Von Point	0913875504	t	/public/images/blank-profile-picture.png
242	Tasha Heidenreich	Judge21@hotmail.com	76692 Ashton Lights	0965699920	t	/public/images/blank-profile-picture.png
243	Dr. Inez Tillman	Rosella.Murray@hotmail.com	56796 Lizeth Mall	0987387892	t	/public/images/blank-profile-picture.png
244	Pete Bartell	Lorna_Wyman37@gmail.com	707 Skyline Drive	0963207697	f	/public/images/blank-profile-picture.png
245	Dr. Daryl Raynor	Lyda1@gmail.com	227 Goodwin Common	0930389288	f	/public/images/blank-profile-picture.png
246	Loren Hermiston V	Terrance.Ledner86@yahoo.com	81732 Mount Street	0921952690	f	/public/images/blank-profile-picture.png
247	Kate Botsford Sr.	Aditya67@yahoo.com	377 Genesis Springs	0975163758	t	/public/images/blank-profile-picture.png
248	Francis Olson	Cole57@hotmail.com	1885 Laverna Junction	0902291749	f	/public/images/blank-profile-picture.png
249	Sergio Brekke	Vivianne57@yahoo.com	162 E 4th Street	0999706935	f	/public/images/blank-profile-picture.png
250	Christian McClure	Talon_Leannon38@yahoo.com	4633 Chestnut Close	0962253900	f	/public/images/blank-profile-picture.png
251	Courtney Boyer	Lavada_Kuphal@gmail.com	788 Amber Burgs	0920451606	t	/public/images/blank-profile-picture.png
252	Lance Brown-Ortiz	Ashley_Heathcote94@gmail.com	67639 Windmill Lane	0927810194	f	/public/images/blank-profile-picture.png
253	Rosemary Schiller V	Valentin.Sawayn77@gmail.com	2690 Hills Spring	0947943891	t	/public/images/blank-profile-picture.png
254	Alberto Gibson	Abdullah.Weissnat88@yahoo.com	1461 Howard Road	0974459701	f	/public/images/blank-profile-picture.png
255	Holly Feeney	Blaise52@gmail.com	274 Meadow Lane	0921635603	f	/public/images/blank-profile-picture.png
256	Kim Goldner	Torrance43@gmail.com	74779 Arlie Plain	0958116846	t	/public/images/blank-profile-picture.png
257	Deborah Fay	Ashley2@hotmail.com	308 Ratke Place	0968606726	t	/public/images/blank-profile-picture.png
258	Miss Melinda Parisian	Ilene.Crooks@hotmail.com	497 Heaney Mews	0949845334	t	/public/images/blank-profile-picture.png
259	Mindy Hegmann	Reta7@gmail.com	18522 Ole Burg	0961376496	t	/public/images/blank-profile-picture.png
260	Karla Schuster	Noe.Bauch80@yahoo.com	7802 O'Keefe Valleys	0939870974	f	/public/images/blank-profile-picture.png
261	Charlotte Friesen Sr.	Audreanne_Upton@hotmail.com	2353 Goldner Forest	0958675139	t	/public/images/blank-profile-picture.png
262	Penny Spencer	Bartholome38@yahoo.com	925 Birch Close	0951610851	t	/public/images/blank-profile-picture.png
263	Oscar Koss	Taya.Boyer39@yahoo.com	176 Boyle Pines	0904076428	f	/public/images/blank-profile-picture.png
264	Mr. Samuel Hoeger	Leta_Nader12@yahoo.com	392 Orchard Lane	0961728590	f	/public/images/blank-profile-picture.png
265	Penny Schaden	Roger_Rolfson96@gmail.com	500 N Union Street	0944713614	t	/public/images/blank-profile-picture.png
266	Caleb O'Reilly	Kelly.Hayes-Hackett@gmail.com	704 1st Avenue	0955808372	f	/public/images/blank-profile-picture.png
267	Marc Reynolds	Matt_Hoppe@yahoo.com	1838 Oak Avenue	0990577301	t	/public/images/blank-profile-picture.png
268	Elaine Cruickshank	Orin6@gmail.com	38923 Schneider Islands	0915573724	t	/public/images/blank-profile-picture.png
269	Cindy Larkin	Cordie.Johnson77@yahoo.com	1427 Terrance Union	0923247003	f	/public/images/blank-profile-picture.png
270	Dr. Jana Harvey	Chanelle_Smith@gmail.com	73651 School Close	0965257363	t	/public/images/blank-profile-picture.png
271	Mr. Javier Mitchell	Janis_Powlowski@yahoo.com	399 Adriana Island	0956685992	f	/public/images/blank-profile-picture.png
272	Erick Ledner	Alex_Blanda@gmail.com	48753 Thompson Manor	0904481060	f	/public/images/blank-profile-picture.png
274	Wilfred Lehner	Winfield38@yahoo.com	653 Sporer Prairie	0943034838	t	/public/images/blank-profile-picture.png
275	Israel Bogisich	Alessandro67@yahoo.com	710 Elvie Well	0938507422	f	/public/images/blank-profile-picture.png
276	Rita Lemke	Aileen.Mueller74@gmail.com	99239 Jacobi Groves	0980326867	f	/public/images/blank-profile-picture.png
277	Dorothy Schneider	Martine.Raynor@hotmail.com	31602 Dach Junction	0991236650	t	/public/images/blank-profile-picture.png
278	Della Parisian Sr.	Louisa_Haag@hotmail.com	4304 Weimann Lakes	0915778476	t	/public/images/blank-profile-picture.png
279	Leah Fisher	Clark.Boehm@gmail.com	799 Amelie Underpass	0992149698	t	/public/images/blank-profile-picture.png
280	Carmen Considine	Taurean_Block@yahoo.com	9640 Westley Plains	0903048761	f	/public/images/blank-profile-picture.png
281	Violet Konopelski	Edyth_Schroeder91@hotmail.com	3914 Harmon Hills	0912505662	t	/public/images/blank-profile-picture.png
282	Ms. Kathryn Lynch	Ashleigh_Schmeler30@yahoo.com	82860 Leon Run	0984581888	t	/public/images/blank-profile-picture.png
283	Willis Nikolaus	Ericka.Greenholt42@hotmail.com	38412 Oak Street	0913299692	f	/public/images/blank-profile-picture.png
284	Phil Bogisich	Consuelo.Satterfield69@yahoo.com	95140 Ritchie Rest	0928230844	t	/public/images/blank-profile-picture.png
285	Kent Durgan	Michele55@hotmail.com	301 Windmill Close	0993863658	f	/public/images/blank-profile-picture.png
286	Stacey Block	Lera.Powlowski@gmail.com	439 Sylvan Mall	0923344002	t	/public/images/blank-profile-picture.png
287	Marlene Bins-Hirthe	Rhiannon.Harvey@gmail.com	77470 Blick Shoal	0960948142	f	/public/images/blank-profile-picture.png
288	Nathaniel Predovic	Amos_Jones86@gmail.com	45704 Beahan Ford	0989426683	t	/public/images/blank-profile-picture.png
289	Frank Lueilwitz	Lon.Halvorson24@hotmail.com	83318 Church Path	0980730798	t	/public/images/blank-profile-picture.png
290	Diana Lockman	Dalton_Hamill7@yahoo.com	9695 Wunsch Motorway	0950053167	f	/public/images/blank-profile-picture.png
291	Carl Paucek	Bridie44@gmail.com	94359 Bennie Pine	0934539310	t	/public/images/blank-profile-picture.png
292	Marcella Hermiston	Avery.McKenzie@hotmail.com	7991 W Bridge Street	0935348522	t	/public/images/blank-profile-picture.png
293	Rudy Thompson	Ernest63@hotmail.com	900 Derwent Close	0988351336	t	/public/images/blank-profile-picture.png
294	Curtis Weissnat	Arch_Shanahan@gmail.com	578 Prohaska Field	0975577935	f	/public/images/blank-profile-picture.png
295	Heather MacGyver	Gaetano.Schumm@yahoo.com	428 5th Avenue	0915268813	t	/public/images/blank-profile-picture.png
296	Jenny Botsford	Francesco.Gutkowski89@yahoo.com	4292 Yew Tree Close	0966920907	f	/public/images/blank-profile-picture.png
297	Alton Bode	Murray.Bradtke81@yahoo.com	66095 Clifton Road	0964795739	f	/public/images/blank-profile-picture.png
298	Marvin Hettinger	Elenora.Jenkins67@hotmail.com	2612 Lonzo Vista	0926576479	f	/public/images/blank-profile-picture.png
299	Dustin Collier	Halle.Batz@gmail.com	333 Broad Street	0980499035	f	/public/images/blank-profile-picture.png
300	Delia Schowalter	Robyn.Mayer@gmail.com	371 W Chestnut Street	0946282776	t	/public/images/blank-profile-picture.png
304	add new	Edited@yahoo.com	123abc	0937105797	t	/public/images/blank-profile-picture.png
301	add	Wilbert53@yahoo.com	123abc	0933255967	t	/public/images/blank-profile-picture.png
302	edited	Nellie63@yahoo.com	123abc	0937105797	t	/public/images/blank-profile-picture.png
303	added	Wilbert53@yahoo.com	537 Klocko Locks	0933255967	t	/public/images/blank-profile-picture.png
\.


--
-- TOC entry 4890 (class 0 OID 0)
-- Dependencies: 224
-- Name: device_device_id_seq; Type: SEQUENCE SET; Schema: project; Owner: postgres
--

SELECT pg_catalog.setval('project.device_device_id_seq', 135, true);


--
-- TOC entry 4891 (class 0 OID 0)
-- Dependencies: 220
-- Name: maintainer_m_id_seq; Type: SEQUENCE SET; Schema: project; Owner: postgres
--

SELECT pg_catalog.setval('project.maintainer_m_id_seq', 64, true);


--
-- TOC entry 4892 (class 0 OID 0)
-- Dependencies: 222
-- Name: unit_unit_id_seq; Type: SEQUENCE SET; Schema: project; Owner: postgres
--

SELECT pg_catalog.setval('project.unit_unit_id_seq', 117, true);


--
-- TOC entry 4893 (class 0 OID 0)
-- Dependencies: 218
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_id_seq', 305, true);


--
-- TOC entry 4724 (class 2606 OID 16530)
-- Name: device device_pkey; Type: CONSTRAINT; Schema: project; Owner: postgres
--

ALTER TABLE ONLY project.device
    ADD CONSTRAINT device_pkey PRIMARY KEY (device_id);


--
-- TOC entry 4720 (class 2606 OID 16506)
-- Name: maintainer maintainer_pkey; Type: CONSTRAINT; Schema: project; Owner: postgres
--

ALTER TABLE ONLY project.maintainer
    ADD CONSTRAINT maintainer_pkey PRIMARY KEY (m_id);


--
-- TOC entry 4726 (class 2606 OID 16542)
-- Name: maintenance_report pk_maintenance_report; Type: CONSTRAINT; Schema: project; Owner: postgres
--

ALTER TABLE ONLY project.maintenance_report
    ADD CONSTRAINT pk_maintenance_report PRIMARY KEY (device_id, m_id, mr_date);


--
-- TOC entry 4722 (class 2606 OID 16522)
-- Name: unit unit_pkey; Type: CONSTRAINT; Schema: project; Owner: postgres
--

ALTER TABLE ONLY project.unit
    ADD CONSTRAINT unit_pkey PRIMARY KEY (unit_id);


--
-- TOC entry 4718 (class 2606 OID 16398)
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- TOC entry 4727 (class 2606 OID 16579)
-- Name: device device_unit_id_fkey; Type: FK CONSTRAINT; Schema: project; Owner: postgres
--

ALTER TABLE ONLY project.device
    ADD CONSTRAINT device_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES project.unit(unit_id) ON DELETE RESTRICT;


--
-- TOC entry 4728 (class 2606 OID 16584)
-- Name: maintenance_report report_device_id_fkey; Type: FK CONSTRAINT; Schema: project; Owner: postgres
--

ALTER TABLE ONLY project.maintenance_report
    ADD CONSTRAINT report_device_id_fkey FOREIGN KEY (device_id) REFERENCES project.device(device_id) ON DELETE CASCADE;


--
-- TOC entry 4729 (class 2606 OID 16589)
-- Name: maintenance_report report_maintainer_id_fkey; Type: FK CONSTRAINT; Schema: project; Owner: postgres
--

ALTER TABLE ONLY project.maintenance_report
    ADD CONSTRAINT report_maintainer_id_fkey FOREIGN KEY (m_id) REFERENCES project.maintainer(m_id);


-- Completed on 2025-07-26 17:22:45

--
-- PostgreSQL database dump complete
--

