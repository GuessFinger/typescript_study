// Drag

interface Draggable {
    dragStartHandler(event: DragEvent): void;

    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void;

    dropHandler(event: DragEvent): void;

    dragLeaveHandler(event: DragEvent): void;
}

// 任务的
enum ProjectStatus {
    ACTIVE,
    FINISHED
}

// project type
class Project {
    constructor(public id: string, public title: string, public description: string,
                public numOfPeople: number, public status: ProjectStatus) {
    }
}

// project state Management
type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listener: Listener<T>) {
        this.listeners.push(listener);
    }
}

// 项目状态管理
class ProjectState extends State<Project> {

    private projects: Project[] = [];

    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static createInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            this.instance = new ProjectState();
            return this.instance;
        }
    }


    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.ACTIVE);
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

const projectState = ProjectState.createInstance();


//  验证函数  规定有哪些类型
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

// 真正的验证函数
function validate(validateInput: Validatable) {
    let validateFlag = true;
    if (validateInput.required) {
        validateFlag = validateFlag && validateInput.value.toString().trim().length !== 0;
    }
    if (!!validateInput.minLength && typeof validateInput.value === 'string') {
        validateFlag = validateFlag && validateInput.value.trim().length > validateInput.minLength;
    }
    if (!!validateInput.maxLength && typeof validateInput.value === 'string') {
        validateFlag = validateFlag && validateInput.value.trim().length < validateInput.maxLength;
    }
    if (!!validateInput.min && typeof validateInput.value === 'number') {
        validateFlag = validateFlag && validateInput.value > validateInput.min;
    }
    if (!!validateInput.max && typeof validateInput.value === 'number') {
        validateFlag = validateFlag && validateInput.value < validateInput.max;
    }

    return validateFlag;
}

// 装饰器，自动绑定
function autoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    console.log(descriptor, '装饰器原始值');
    const originalMethod = descriptor.value;
    console.log(originalMethod, '装饰器');
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            console.log('这里的this是什么', this);
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }
    return adjDescriptor;
}

// Component Base Class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement; // 模板元素 也就是在html中的template
    hostElement: T; // 容器元素  app
    element: U; // 格式转换后的元素

    protected constructor(templateId: string, hostElementId: string,
                          insertAtBegin: boolean, newElementId?: string) {
        // 模板元素
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        // 目标元素
        this.hostElement = document.getElementById(hostElementId)! as T;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtBegin);
    }

    private attach(insertAtBegin: boolean) {
        // 往主节点上插入元素
        this.hostElement.insertAdjacentElement(insertAtBegin ? 'afterbegin' : 'beforeend',
            this.element);
    }

    abstract configure(): void;

    abstract renderContent(): void;
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons() {
        if (this.project.numOfPeople === 1) {
            return '1 person'
        }
        return `${this.project.numOfPeople} person assign`;
    }


    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }

    @autoBind
    dragStartHandler(event: DragEvent): void {
        console.log('dragStart')
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    @autoBind
    dragEndHandler(event: DragEvent): void {
        console.log('dragEnd')
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons;
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}

// projectList
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    // 更换方法后 直接可以注释掉
    // templateElement: HTMLTemplateElement; // 模板元素 也就是在html中的template
    // hostElement: HTMLDivElement; // 容器元素  app
    // element: HTMLElement; // 格式转换后的元素
    assignedProjects: any[];// 这个就是添加的项目

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];

        // 已经被抽取
        // // 目标元素
        // this.hostElement = document.getElementById('app')! as HTMLDivElement;
        // // 复制的元素
        // const importedNode = document.importNode(this.templateElement.content, true);
        // this.element = importedNode.firstElementChild as HTMLElement;
        // this.element.id = `${this.type}-projects`;

        this.configure();
        this.renderContent();
    }

    @autoBind
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            console.log('start drag');
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable')
        }
    }

    dropHandler(event: DragEvent): void {
        console.log(event, 21121);
    }

    @autoBind
    dragLeaveHandler(event: DragEvent): void {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable')
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLElement;
        listEl.innerHTML = '';
        for (const item of this.assignedProjects) {

            new ProjectItem(this.element.querySelector('ul')!.id, item);

            // const listItem = document.createElement('li');
            // listItem.textContent = item.title
            // listEl.appendChild(listItem);
        }
    }

    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }


    configure(): void {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        // 添加监听函数
        projectState.addListener((projects: any[]) => {
            const filterProjects = projects.filter(item => {
                if (this.type === 'active') {
                    return item.status === ProjectStatus.ACTIVE;
                }
                return item.status === ProjectStatus.FINISHED
            })

            this.assignedProjects = filterProjects;
            this.renderProjects();
        });
    }

}


// 用户输入的内容
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    // templateElement: HTMLTemplateElement; // 模板元素 也就是在html中的template
    // hostElement: HTMLDivElement; // 容器元素  app
    // element: HTMLFormElement; // 格式转换后的元素
    titleInputElement: HTMLInputElement; // 标题元素
    descriptionInputElement: HTMLInputElement; // 描述元素
    peopleInputElement: HTMLInputElement; //人员元素


    constructor() {
        super('project-input', 'app', true);
        // // 模板元素
        // this.templateElement = document.getElementById()! as HTMLTemplateElement;
        // // 目标元素
        // this.hostElement = document.getElementById()! as HTMLDivElement;
        // // 复制的元素
        // const importedNode = document.importNode(this.templateElement.content, true);
        // this.element = importedNode.firstElementChild as HTMLFormElement;
        // this.element.id = 'ez';


        // 获取标注的元素
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
    }

    // 获取输入框的数据
    private gatherUserInput(): [string, string, number] | undefined {
        const enteredTitle = this.titleInputElement.value;
        const enteredDesc = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        // 校验一下 如果有没有输入的 直接报错 一种方式就是直接进行长度校验

        const titleValidate: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descValidate: Validatable = {
            value: enteredDesc,
            required: true,
            minLength: 1
        };
        const peopleValidate: Validatable = {
            value: enteredPeople,
            required: true,
            min: 1
        };
        if (validate(titleValidate) && validate(descValidate) && validate(peopleValidate)) {
            return [enteredTitle, enteredDesc, +enteredPeople];
        } else {
            alert('验证不通过');
            return;
        }

    }

    // 清空素有input
    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }


    @autoBind
    private submitHandler(event: Event) {
        event.preventDefault();
        // 先获取里面的元素
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title, description, people);
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }


    configure() {
        console.log(this, '22');
        // 这里的this已经发生改变了  所以要bind进行绑定 一种方式就是bind(this)
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent(): void {
    }

}


const pj = new ProjectInput();
const activeProject = new ProjectList('active');
const finishedProject = new ProjectList('finished');
