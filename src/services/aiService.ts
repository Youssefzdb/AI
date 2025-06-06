import { AIResponse } from '../types/chat';

class AIService {
  private knowledgeBase = {
    technology: {
      programming: {
        javascript: 'JavaScript هي لغة برمجة عالية المستوى ومفسرة، تُستخدم بشكل أساسي في تطوير الويب...',
        python: 'Python هي لغة برمجة عالية المستوى وسهلة التعلم، تتميز بسهولة قراءة الكود...',
        react: 'React هو مكتبة JavaScript لبناء واجهات المستخدم، طورتها شركة Meta...',
        ai: 'الذكاء الاصطناعي هو محاكاة الذكاء البشري في الآلات المبرمجة للتفكير والتعلم...'
      },
      databases: {
        sql: 'SQL (Structured Query Language) هي لغة استعلام منظمة لإدارة قواعد البيانات العلائقية...',
        nosql: 'قواعد البيانات NoSQL هي قواعد بيانات غير علائقية مصممة للتعامل مع البيانات الضخمة...'
      }
    },
    science: {
      physics: {
        quantum: 'فيزياء الكم هي فرع من الفيزياء يدرس سلوك المادة والطاقة على المستوى الذري...',
        relativity: 'نظرية النسبية لأينشتاين تتكون من النسبية الخاصة والعامة...'
      },
      chemistry: {
        organic: 'الكيمياء العضوية هي فرع من الكيمياء يدرس مركبات الكربون...',
        inorganic: 'الكيمياء غير العضوية تدرس المركبات التي لا تحتوي على روابط كربون-هيدروجين...'
      },
      biology: {
        genetics: 'علم الوراثة يدرس الجينات والوراثة والتنوع الجيني في الكائنات الحية...',
        evolution: 'نظرية التطور تفسر كيف تتغير الأنواع عبر الزمن من خلال الانتقاء الطبيعي...'
      }
    },
    mathematics: {
      algebra: 'الجبر هو فرع من الرياضيات يتعامل مع الرموز والقواعد لمعالجة هذه الرموز...',
      calculus: 'حساب التفاضل والتكامل يدرس معدلات التغيير والمساحات تحت المنحنيات...',
      statistics: 'الإحصاء هو علم جمع وتحليل وتفسير وعرض البيانات...'
    },
    history: {
      ancient: 'التاريخ القديم يشمل الحضارات المبكرة مثل المصرية والبابلية واليونانية...',
      medieval: 'العصور الوسطى امتدت من القرن الخامس إلى القرن الخامس عشر الميلادي...',
      modern: 'التاريخ الحديث يبدأ من عصر النهضة ويشمل الثورات الصناعية والعلمية...'
    },
    literature: {
      arabic: 'الأدب العربي له تاريخ عريق يمتد لأكثر من 1500 عام...',
      world: 'الأدب العالمي يشمل الأعمال الأدبية من جميع أنحاء العالم...'
    },
    philosophy: {
      ethics: 'الأخلاق هي فرع من الفلسفة يتعامل مع مفاهيم الصواب والخطأ...',
      logic: 'المنطق هو دراسة مبادئ الاستدلال الصحيح...'
    },
    economics: {
      macro: 'الاقتصاد الكلي يدرس الاقتصاد ككل، بما في ذلك التضخم والبطالة...',
      micro: 'الاقتصاد الجزئي يدرس سلوك الأفراد والشركات في اتخاذ القرارات...'
    },
    medicine: {
      anatomy: 'علم التشريح يدرس بنية الجسم البشري وأجزاءه...',
      physiology: 'علم وظائف الأعضاء يدرس كيفية عمل أجهزة الجسم...'
    }
  };

  private getTopicKeywords(text: string): string[] {
    const keywords = text.toLowerCase().split(/\s+/);
    return keywords.filter(word => word.length > 3);
  }

  private findRelevantKnowledge(query: string): { content: string; topic: string; confidence: number }[] {
    const keywords = this.getTopicKeywords(query);
    const results: { content: string; topic: string; confidence: number }[] = [];

    const searchInCategory = (category: any, categoryName: string, path: string = '') => {
      for (const [key, value] of Object.entries(category)) {
        const currentPath = path ? `${path}.${key}` : key;
        
        if (typeof value === 'string') {
          const relevanceScore = keywords.reduce((score, keyword) => {
            if (value.toLowerCase().includes(keyword) || key.toLowerCase().includes(keyword)) {
              return score + 1;
            }
            return score;
          }, 0);

          if (relevanceScore > 0) {
            results.push({
              content: value,
              topic: `${categoryName}.${currentPath}`,
              confidence: Math.min(relevanceScore / keywords.length, 1)
            });
          }
        } else if (typeof value === 'object') {
          searchInCategory(value, categoryName, currentPath);
        }
      }
    };

    for (const [categoryName, category] of Object.entries(this.knowledgeBase)) {
      searchInCategory(category, categoryName);
    }

    return results.sort((a, b) => b.confidence - a.confidence);
  }

  private generateDetailedResponse(query: string, relevantKnowledge: any[]): string {
    if (relevantKnowledge.length === 0) {
      return this.generateGeneralResponse(query);
    }

    const primaryKnowledge = relevantKnowledge[0];
    let response = primaryKnowledge.content;

    // Add contextual information
    if (relevantKnowledge.length > 1) {
      response += '\n\nمعلومات إضافية ذات صلة:\n';
      relevantKnowledge.slice(1, 3).forEach((knowledge, index) => {
        response += `${index + 1}. ${knowledge.content.substring(0, 100)}...\n`;
      });
    }

    // Add practical examples or applications
    response += '\n\nتطبيقات عملية:\n';
    response += this.generatePracticalExamples(primaryKnowledge.topic);

    return response;
  }

  private generatePracticalExamples(topic: string): string {
    const examples = {
      'technology.programming.javascript': '• تطوير مواقع الويب التفاعلية\n• بناء تطبيقات الهاتف المحمول\n• تطوير خوادم الويب',
      'technology.programming.python': '• تحليل البيانات والذكاء الاصطناعي\n• تطوير تطبيقات الويب\n• الأتمتة والبرمجة النصية',
      'science.physics.quantum': '• الحوسبة الكمية\n• التشفير الكمي\n• تطوير أجهزة الاستشعار المتقدمة',
      'mathematics.statistics': '• تحليل البيانات التجارية\n• البحث العلمي\n• التنبؤ بالاتجاهات'
    };

    return examples[topic] || '• تطبيقات متنوعة في مجالات مختلفة\n• أهمية في البحث والتطوير\n• استخدامات في الحياة اليومية';
  }

  private generateGeneralResponse(query: string): string {
    const generalResponses = [
      'هذا سؤال مثير للاهتمام. دعني أقدم لك معلومات شاملة حول هذا الموضوع.',
      'يمكنني مساعدتك في فهم هذا الموضوع بشكل أفضل من خلال تقديم تحليل مفصل.',
      'هذا موضوع واسع ومعقد. سأقوم بتقسيمه إلى نقاط رئيسية لسهولة الفهم.'
    ];

    const randomResponse = generalResponses[Math.floor(Math.random() * generalResponses.length)];
    
    return `${randomResponse}\n\nبناءً على استفسارك حول "${query}"، يمكنني تقديم المعلومات التالية:\n\n` +
           'هذا الموضوع يتطلب دراسة متعمقة ويمكن تناوله من عدة زوايا. ' +
           'أنصحك بطرح أسئلة أكثر تحديداً للحصول على إجابات أكثر دقة وتفصيلاً.\n\n' +
           'هل تود التعمق في جانب معين من هذا الموضوع؟';
  }

  private generateFollowUpQuestions(topic: string): string[] {
    const followUpMap = {
      technology: [
        'ما هي أحدث التطورات في هذا المجال؟',
        'كيف يمكنني تعلم هذه التقنية؟',
        'ما هي التحديات الحالية؟'
      ],
      science: [
        'ما هي التطبيقات العملية لهذا المفهوم؟',
        'كيف يؤثر هذا على حياتنا اليومية؟',
        'ما هي الاكتشافات الحديثة؟'
      ],
      mathematics: [
        'كيف يمكن تطبيق هذا في الواقع؟',
        'ما هي الأمثلة العملية؟',
        'كيف يرتبط بمجالات أخرى؟'
      ]
    };

    for (const [category, questions] of Object.entries(followUpMap)) {
      if (topic.includes(category)) {
        return questions;
      }
    }

    return [
      'هل تريد المزيد من التفاصيل؟',
      'ما هي الجوانب التي تهمك أكثر؟',
      'كيف يمكنني مساعدتك أكثر؟'
    ];
  }

  async processQuery(query: string): Promise<AIResponse> {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const relevantKnowledge = this.findRelevantKnowledge(query);
    const response = this.generateDetailedResponse(query, relevantKnowledge);
    
    const primaryTopic = relevantKnowledge.length > 0 ? relevantKnowledge[0].topic : 'general';
    const confidence = relevantKnowledge.length > 0 ? relevantKnowledge[0].confidence : 0.7;

    return {
      text: response,
      confidence,
      sources: ['قاعدة المعرفة الداخلية', 'المراجع العلمية المعتمدة'],
      relatedTopics: relevantKnowledge.slice(1, 4).map(k => k.topic),
      followUpQuestions: this.generateFollowUpQuestions(primaryTopic)
    };
  }

  async analyzeText(text: string): Promise<{
    sentiment: 'positive' | 'negative' | 'neutral';
    topics: string[];
    complexity: 'simple' | 'moderate' | 'complex';
    suggestions: string[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const topics = this.getTopicKeywords(text);
    const complexity = text.length > 200 ? 'complex' : text.length > 50 ? 'moderate' : 'simple';

    return {
      sentiment: 'neutral',
      topics: topics.slice(0, 5),
      complexity,
      suggestions: [
        'يمكن تبسيط الشرح أكثر',
        'إضافة أمثلة عملية',
        'ربط الموضوع بمجالات أخرى'
      ]
    };
  }
}

export const aiService = new AIService();