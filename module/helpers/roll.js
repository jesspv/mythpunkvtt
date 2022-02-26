export function _onRoll(skill) {
    onclick.prevDefault();
    const element = onclick.currentTarget;
    const dataset = element.dataset;
    const label = dataset.label ? `Rolled ${dataset.label}` : '';
    const roll = new Roll("1d10 + @skill");
    roll.evaluate({
        skill: skill,
        async: true,
    });
    return roll;
}