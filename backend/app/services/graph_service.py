# Module 4: Statute Intelligence & Knowledge Graph
from neo4j import GraphDatabase

class GraphService:
    """
    Builds the citation and statute graph in Neo4j.
    """
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def create_statute_node(self, act, year, section):
        query = """
        MERGE (s:Section {act: $act, year: $year, number: $section})
        MERGE (a:Act {name: $act, year: $year})
        MERGE (s)-[:BELONGS_TO]->(a)
        """
        with self.driver.session() as session:
            session.run(query, act=act, year=year, section=section)

    def link_paragraph_to_statute(self, para_id, act, year, section, relationship):
        query = """
        MATCH (p:Paragraph {id: $para_id}), (s:Section {act: $act, year: $year, number: $section})
        MERGE (p)-[r:APPLIES {type: $rel}]->(s)
        """
        with self.driver.session() as session:
            session.run(query, para_id=str(para_id), act=act, year=year, section=section, rel=relationship)
