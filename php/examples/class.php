<?php namespace Acme\TestPackage;
/**
 * This script belongs to the package "Acme.TestPackage".
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 3 of the
 * License, or (at your option) any later version.
 */

use Acme\TestPackage\Service\FooGenerator;
use BigBite\Flow\Annotations as Flow;

/**
* Here goes the description of the class. It should explain what the main
* purpose of this class is...
*
* @Flow\Scope(”singleton”)
*/
class UniverseAnalyzer extends BaseClass implements SomeInterface {
    /**
     * Some injected dependency
     *
     * @Flow\Inject
     * @var FooGenerator
     */
    protected $someDependency = null;

    /**
     * Shows if you are addicted to Flow
     *
     * @var boolean
     */
    static protected $addictedToFlow = true;

    /**
     * Shows if you are a fan of Flow
     * @var boolean
     */
    protected $fanOfFlow;

    /**
     * A great method which shows how to indent control structures.
     *
     * @param MyClass $object An instance of MyClass
     * @param array $someArray Some array
     * @return void
     * @throws \Exception
     */
    public function analyzeUniverse(MyClass $object, array $someArray = array())
    {
        $subObjects = $object->getSubObjects();

        foreach ($subObjects as $subObject)
        {
            // @var $subObject MySubClass
            $subObject->doSomethingCool();
        }

        if (   isset($someArray['question'])
            && $this->answerToEverything === 42
            || count($someArray) > 3)
        {
            $this->fanOfFlow = true;
        }
        else
        {
            throw new \Exception('We cannot tolerate that.', 1223391710);
        }
    }

    /**
     * This is a setter for the fanOfFlow property.
     *
     * @param boolean $isFan Pass TRUE to mark a fan, FALSE for a Zend follower
     * @return mixed
     */
    public function setFanOfFlow($isFan)
    {
        $this->fanOfFlow = $isFan;
    }

    /**
     * As simple as it gets – a boolean getter.
     *
     * @return boolean Whether a foo was detected (TRUE) or not (FALSE)
     * @api
     */
    static public function isAddictedToFlow()
    {
        return self::$addictedToFlow;
    }
}
