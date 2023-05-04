/*
Note that this example assumes that the kafka-clients.jar library is in custom-lib and may 
need to be modified to work with your specific Kafka deployment and use case.

https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients
*/

var props = new Packages.java.util.Properties();
props.setProperty('bootstrap.servers', 'localhost:9092'); // Kafka broker address
props.setProperty('acks', 'all'); // Wait for all replicas to acknowledge
props.setProperty('retries', '0'); // No retry attempts
props.setProperty('batch.size', '16384'); // Size of each batch of records sent
props.setProperty('linger.ms', '1'); // Time to wait before sending a batch
props.setProperty('buffer.memory', '33554432'); // Total buffer memory available to the producer
props.setProperty('key.serializer', 'org.apache.kafka.common.serialization.StringSerializer');
props.setProperty('value.serializer', 'org.apache.kafka.common.serialization.StringSerializer');

var KafkaProducer = Packages.org.apache.kafka.clients.producer.KafkaProducer;
var ProducerRecord = Packages.org.apache.kafka.clients.producer.ProducerRecord;

// Create Kafka producer instance
var producer = new KafkaProducer(props);

// Send a message to Kafka
var ktopic = 'my-topic';
var key = 'my-key';
var value = 'Hello, world!';
var record = new ProducerRecord(ktopic, key, value);
producer.send(record);

// Close the producer when finished
producer.close();
