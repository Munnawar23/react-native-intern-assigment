import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  mainHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  mainSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },

  createSection: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },

  templatesSection: {
    paddingTop: 10,
  },

  primarySectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  sectionDescription: {
    fontSize: 15,
    marginBottom: 20,
    paddingHorizontal: 4,
    opacity: 0.7,
  },
  subsection: {
    marginBottom: 20,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 4,
    opacity: 0.9,
  },

  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  createOptionsGrid: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
  },
  createOptionCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
  },
  createOptionEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  createOptionText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
  },
  createOptionSubtext: {
    fontSize: 13,
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default styles;
