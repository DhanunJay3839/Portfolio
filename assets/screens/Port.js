import React, { useRef, useEffect } from 'react';

import {
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';


const Port = () => {
  const colorAnim = useRef(new Animated.Value(0)).current;
  
  const scrollRef = useRef();
  const sectionPositions = useRef([]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const textColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#3b82f6', '#8b5cf6'],
  });

  const scrollToSection = (index) => {
    if (sectionPositions.current[index] != null) {
      scrollRef.current?.scrollTo({
        y: sectionPositions.current[index],
        animated: true,
      });
    }
  };

  const handleLayout = (event, index) => {
    sectionPositions.current[index] = event.nativeEvent.layout.y;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 10,}}>
      <View style={{flex:1}}>

     
      <View style={{ alignItems: 'center', paddingVertical: 20 }}>
        <Image source={require('../images/myprofile.jpg')} style={{ height: 80, width: 80, borderRadius: 40 }} />
        <Animated.Text style={{ fontSize: 24, color: textColor, fontWeight: '400', marginTop: 10 }}>
          Dhanunjay Thalluri
        </Animated.Text>
        <Text style={{ fontSize: 16, color: '#4B5563', fontWeight: '400' }}>Java Full Stack Developer</Text>
      </View>

      <View style={styles.tabContainer}>
        {['About', 'Projects', 'Skills', 'Contact'].map((tab, index) => (
          <TouchableOpacity key={index} onPress={() => scrollToSection(index)} activeOpacity={0.7}>
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* About */}
        <View onLayout={(e) => handleLayout(e, 0)} style={styles.section}>
          <Text style={styles.sectionHeading}>About Me</Text>
          <Text style={styles.sectionText}>
            I'm a Java Full Stack Developer with a strong foundation in building scalable backend systems using Spring Boot,
            and dynamic, responsive user interfaces with React and React Native. I specialize in developing RESTful APIs,
            real-time applications, and full-cycle development from database to frontend.
          </Text>
        </View>

        {/* Projects */}
        <View onLayout={(e) => handleLayout(e, 1)} style={styles.section}>
          <Text style={styles.sectionHeading}>Projects</Text>

          {/* Project Card Template */}
          {[
            {
              title: 'Expenses Tracker',
              tech: ['React Native', 'Spring Boot'],
              description: 'A full-stack mobile app to track income, expenses, transfers and set monthly budget with real-time balance updates.',
              link: 'https://github.com/DhanunJay3839/ExpensesTrackerApp',
            },
            {
              title: 'Weather App',
              tech: ['React Native', 'Open Weather API'],
              description: 'Displays current, hourly and 7-day forecast, with windspeed, humidity, sunset/sunrise times.',
              link: 'https://github.com/DhanunJay3839/Weather-App',
            },
            {
              title: 'Messenger App',
              tech: ['React Native', 'Spring Boot'],
              description: 'A real-time chat app using WebSocket (STOMP) with instant messaging support.',
              link: 'https://github.com/DhanunJay3839/ChattingApp',
            },
            {
              title: 'Ecommerce Website',
              tech: ['ReactJS', 'Spring Boot'],
              description: 'A full-stack eCommerce app with cart, authentication, product listing, and order management.',
              link: 'https://github.com/DhanunJay3839/Ecommerce-Application',
            },
          ].map((proj, idx) => (
            <View
              key={idx}
              style={{
                height: 198,
                width: 358,
                padding: 17,
                borderWidth: 1,
                borderColor: '#F3F4F6',
                borderRadius: 12,
                alignSelf: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                marginTop: idx === 0 ? 0 : 20,
              }}
            >
              <Text style={{ fontSize: 16, color: '#111827', fontWeight: '500' }}>{proj.title}</Text>
              <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                {proj.tech.map((tech, i) => (
                  <View
                    key={i}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 24,
                      paddingHorizontal: 10,
                      backgroundColor: ['ReactJS', 'React Native'].includes(tech)
                        ? '#DBEAFE'
                        : tech.includes('Spring') || tech === 'Open Weather API'
                        ? '#F3E8FF'
                        : '#DCFCE7',
                      borderRadius: 60,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: tech.includes('Spring')
                          ? '#16A34A'
                          : tech === 'Open Weather API'
                          ? '#9333EA'
                          : '#2563EB',
                        fontWeight: '400',
                      }}
                    >
                      {tech}
                    </Text>
                  </View>
                ))}
              </View>
              <Text style={{ fontSize: 14, color: '#4B5563', fontWeight: '400', marginTop: 10 }}>{proj.description}</Text>
              <TouchableOpacity onPress={() => Linking.openURL(proj.link)} activeOpacity={0.7}>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ fontSize: 14, color: '#2563EB', fontWeight: '500' }}>View on Github ›</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View onLayout={(e) => handleLayout(e, 2)} style={{ padding: 10, marginTop: 50 }}>
          <Text style={styles.sectionHeading}>Skills</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20, alignSelf: 'center' }}>
            {[
              {
                title: 'Frontend',
                list: ['HTML', 'CSS', 'ReactJS', 'React Native', 'JavaScript'],
              },
              {
                title: 'Backend',
                list: ['Java', 'Spring Boot', 'RESTful APIs', 'JSP', 'Servlets'],
              },
              {
                title: 'Database',
                list: ['MySQL', 'JDBC', 'Hibernate'],
              },
              {
                title: 'Tools',
                list: ['Git', 'GitHub', 'Postman', 'VS Code', 'IntelliJ IDEA'],
              },
            ].map((skill, idx) => (
              <View
                key={idx}
                style={{
                  height: 146,
                  width: 171,
                  borderRadius: 12,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#F3F4F6',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}
              >
                <Text style={{ fontSize: 16, color: 'black', fontWeight: '500' }}>{skill.title}</Text>
                <View style={{ marginTop: 10 }}>
                  {skill.list.map((item, i) => (
                    <Text key={i} style={{ fontSize: 14, color: '#4B5563', fontWeight: '400' }}>
                      {item}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Contact */}
        <View onLayout={(e) => handleLayout(e, 3)} style={{ padding: 10, minHeight: 300, marginTop: 180 }}>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:thalluridhanunjay@gmail.com')} activeOpacity={0.7}>
            <View style={styles.contactButtonGray}>
              <Text style={styles.contactButtonTextDark}>Email</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.linkedin.com/in/dhanunjay-thalluri-47a5b5244/')}
            activeOpacity={0.7}
          >
            <View style={[styles.contactButton, { backgroundColor: '#0077B5' }]}>
              <Text style={styles.contactButtonText}>LinkedIn</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL('https://github.com/DhanunJay3839')} activeOpacity={0.7}>
            <View style={[styles.contactButton, { backgroundColor: '#111827' }]}>
              <Text style={styles.contactButtonText}>GitHub</Text>
            </View>
          </TouchableOpacity>

          {/* Optional Resume Button */}
          <TouchableOpacity onPress={() => Linking.openURL('https://github.com/DhanunJay3839/Resume')} activeOpacity={0.7}>
            <View style={[styles.contactButton, { backgroundColor: '#1E40AF' }]}>
              <Text style={styles.contactButtonText}>Download Resume</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
       </View>
    </SafeAreaView>
  );
};

export default Port;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabText: {
    fontSize: 16,
    color: '#374151',
  },
  section: {
    padding: 10,
    minHeight: 300,
    marginTop: 30,
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#111827',
  },
  sectionText: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 10,
    alignSelf: 'center',
  },
  contactButton: {
    height: 48,
    width: 358,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  contactButtonGray: {
    height: 48,
    width: 358,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginTop: 20,
  },
  contactButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '400',
  },
  contactButtonTextDark: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '400',
  },
});
